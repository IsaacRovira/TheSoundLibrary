// config/passport.js
var nodeDir = "F:\\Program Files\\nodejs\\";
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var mysql			= require('mysql');
// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
	var con = mysql.createConnection({
		host: "127.0.0.1",
		port: 3360,
		user: "nodejs",
		password: "node.js",
		database: "soundlib"
	});

    // =========================================================================
    // passport session
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // *************************************************************************
    // Registro LOCAL
    // *************************************************************************
    // local-signup para la estrategia de registro con usuario y clave local.
    

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // La función no se activa hasta que llega el dato.
        process.nextTick(function() {
				
			// Verificar si el email recibido existe.
			con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields){
				if(err) done(err);
				if(result[0].email < 1){
					//No existe solicitamos signupMessage.
					return done(null, false, req.flash('signupMessage', 'Esta cuenta de correo ya ha sido registrada.'));
				}else{				
					// Si no existe el usuario, crear el usuario.
					var newUser = new User();

					// Almacenamos las credenciales locles del usuario.
					newUser.local.email    = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.local.id_key = newUser.generateHash(email);
					
					// y las guardamos en la base de datos.
					var values = [newUser.locla.email,newUser.local.password, newUser.local.id_key, 1];
					
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
		//Utilizaremos el email en lugar del nombre de usuario.
		usernameField		: 'email',
		passwordField		: 'password',		
		passReqToCallback	: true
	}, function(req, emial, password, done){ //Este es la función callback.
	//Buscar en la base de datos el email introducido en el forulario.
		con.query("SELECT count(email) as email, password from users where email = ?", email, function(err, result,fields){
			if(err){
				return done(err); //En caso de error salimos.
			};
			if(result[0].email < 1){
				return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto")); //Si el usuario no existe Solicitamos el flashdata con el mensaje de error.
			};
			if(!User.validPassword(password, result[0].password)){
				return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto")); //Si el usuario no existe Solicitamos el flashdata con el mensaje de error.
			};			
				//Si todo está bien 
				return done(null, user);
		});
	}));
};