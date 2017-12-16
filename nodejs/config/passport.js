// config/passport.js
var nodeDir = "F:\\Program Files\\nodejs\\";

//Modulos
var LocalStrategy   = require('passport-local').Strategy;
var mysql			= require('mysql');

//Modelo usuario
var User            = require('../app/models/user');

// EXPORTS passport
module.exports = function(passport) {
	
	var con = mysql.createConnection({
		host: "127.0.0.1",
		port: 3360,
		user: "nodejs",
		password: "node.js",
		database: "soundlib"
	});

    // ********************************************
    // SESIONES passport
    // ********************************************    
    // serialize & unserialize

    //serialize
    passport.serializeUser(function(user, done) {		
        done(null, user);
    });

    //deserialize
    passport.deserializeUser(function(id, done) {
		console.log("deserialize: " + id);
        con.query("SELECT * from users where ID_key = ?", id, function(err, results){		
			done(err, results[0].ID_key);
		});
	});
	
	// *************************************************************************
    // Registro LOCAL
    // *************************************************************************
    // local-signup para la estrategia de registro con usuario y clave local.  

    passport.use('local-signup', new LocalStrategy({        
        usernameField : 'email', //Utilizar el email en lugar de un nombre de usuario.
        passwordField : 'password',
        passReqToCallback : true // callback activado
    },
    function(req, email, password, done) {

        // asynchronous
        // La función no se activa hasta que llega el dato.
        process.nextTick(function() {
			
			// Verificar si el email recibido a través del form existe en la BD.
			con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields){
				if(err) done(err);
				console.log(result[0].email);
				if(result[0].email > 0){//No existe solicitamos signupMessage.				
					return done(null, false, req.flash('signupMessage', 'Esta cuenta de correo ya ha sido registrada.'));
				}else{// Si no existe el usuario, crear el usuario.					
					var newUser = new User();					
					
					// Almacenamos las credenciales locles del usuario.
					newUser.local.email		= email;
					newUser.local.password	= newUser.generateHash(password);
					newUser.local.id_key	= newUser.generateHash(email);
					
					// y las guardamos en la base de datos.
					var values = [newUser.local.email,newUser.local.password, newUser.local.id_key, 1];
					
					con.query("INSERT INTO Users (Email, password, id_key,local) values (?,?,?,?)", values, function (err, result, fileds){
						if(err)
							done(err);
						return done(null, newUser);
					});
				}
			});
		});
	}));
	
    // *************************************************************************
    // Inicio de sesión LOCAL
    // *************************************************************************
    // local-login para la estrategia de inicio de sesión con usuario y clave local.
	
	passport.use('local-login', new LocalStrategy({		
		usernameField		: 'email', //Utilizar el email en lugar de un nombre de usuario.
		passwordField		: 'password',	
		passReqToCallback	: true
	}, function(req, email, password, done){ //Este es la función callback.
		
		theUser = new User();
		//Buscar en la base de datos el email introducido en el forulario.
		con.query("SELECT * from users where email = ?", email, function(err, result, fields){			
			if(err){
				return done(err); //En caso de error salimos.				
			};
			
			//Si el usuario no existe Solicitamos el flashdata con el mensaje de error.
			if(result.length<1){				
				return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));				
			};
			
			//Si la password es incorrecta solicitamos el flashdata con el mensaje de error.
			if(!theUser.validPassword(password, result[0].Password)){
				console.log("Password error");
				return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));
			};
			
			//Si todo está bien devolvemos el objeto "User" con los datos del usuario.
			return done(null, result[0].ID_key);
		});
	}));
};