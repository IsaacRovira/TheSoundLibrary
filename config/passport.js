// config/passport.js

//Imports
var config          = require(process.cwd()+'/config/config.js');
var con             = require(path.normalize(config.raiz + "/config/database.js"));

//Modulos
var path            = require(config.modulos + 'path');
var LocalStrategy   = require(config.modulos + 'passport-local').Strategy;
//var express         = require(config.modulos + 'express');

//Modelo usuario
var User            = require(path.normalize(config.raiz+'/app/models/user'));
function newLocalStrategy(){
        return new LocalStrategy({
            usernameField : 'email', //Utilizar el email en lugar de un nombre de usuario.
            passwordField : 'password',
            passReqToCallback : true // callback activado
        });
    };
    
// EXPORTS passport
module.exports = function(passport) {	
//Funciones serialize & unserialize
    passport.serializeUser(function(user, done) {
        done(null, user.local.id);
    });
    passport.deserializeUser(function(id, done) {
        con.query("SELECT * from users where ID_key = ?", id, function(err, results){
            user = new User();
            user.local.id       = results[0].ID_key;
            user.local.email	= results[0].Email;
            user.local.password	= results[0].Password;
            done(err, user);
        });
    });
    
//Registro con usuario y clave local.
    passport.use('local-signup', newLocalStrategy(),
        function(req, email, password, done) {
// La función no se activa hasta que llega el dato.            
            process.nextTick(function() {
// Verificar si el email recibido a través del form existe en la BD.                
                con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result){
                //con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields, next){
                    if(err) done(err);
                    console.log(result[0].email);
//No existe solicitamos signupMessage.                    
                    if(result[0].email > 0){
                            return done(null, false, req.flash('signupMessage', 'Esta cuenta de correo ya ha sido registrada.'));
//Si no existe el usuario, crear el usuario.                            
                    }else{
                        var newUser = new User();
//Almacenamos las credenciales locles del usuario.
                        newUser.local.email		= email;
                        newUser.local.password	= newUser.generateHash(password);
                        newUser.local.id    	= newUser.generateHash(email);
//y las guardamos en la base de datos.
                        var values = [newUser.local.email, newUser.local.password, newUser.local.id, 1];                        
                        con.query("INSERT INTO Users (Email, password, id_key, local) values (?,?,?,?)", values, function (err){
                        //con.query("INSERT INTO Users (Email, password, id_key, local) values (?,?,?,?)", values, function (err, result, fileds){
                                if(err)
                                        done(err);
                                return done(null, newUser);
                        });
                    }
                });
            });
    });

// Inicio de sesión con usuario y clave local.	
	passport.use('local-login', newLocalStrategy(), function(req, email, password, done){
            theUser = new User();            
//Buscar en la base de datos el email introducido en el forulario.
            con.query("SELECT * from users where email = ?", email, function(err, result){
            //con.query("SELECT * from users where email = ?", email, function(err, result, fields){
                if(err){
                    return done(err); //En caso de error salimos.				
                };                
//Si el usuario no existe Solicitamos el flashdata con el mensaje de error.
                if(result.length<1){
                    return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));
                };                
//Almacenamos las credenciales del usuario en nuestro objeto "User"...
                theUser.local.id	= result[0].ID_key;
                theUser.local.email 	= email;			
//Si la password es incorrecta solicitamos el flashdata con el mensaje de error.
			if(!theUser.validPassword(password, result[0].Password)){
				console.log("Password error");
				return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));
			};			
//Si todo está bien devolvemos el objeto "User" con los datos del usuario.
			return done(null, theUser);
		});
	});
        
//FIN PASSPORT
};




	/*DB
	var con = mysql.createConnection({
		host: config.sql.ip,
		port: config.sql.port,
		user: config.sql.user,
		password: config.sql.pass,
		database: config.sql.db
	});
	*/
       
    /*
        new LocalStrategy({        
            usernameField : 'email', //Utilizar el email en lugar de un nombre de usuario.
            passwordField : 'password',
            passReqToCallback : true // callback activado
        }
     */