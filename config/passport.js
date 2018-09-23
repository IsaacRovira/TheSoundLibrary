// config/passport.js

//Configuracion
var config          = require(process.cwd()+'/config/config.js');

//Modulos
var path            = require(config.modulos + 'path');
var LocalStrategy   = require(config.modulos + 'passport-local').Strategy;
//var mysql           = require(config.modulos + 'mysql');
//var express         = require(config.modulos + 'express');

//Modelo usuario
var sql             = require(path.normalize(config.raiz + "/config/database.js"));
var User            = require(path.normalize(config.raiz+'/app/models/user.js'));

//Aux
var aux             = require(path.normalize(config.raiz+'/app/misc/misc.js'));


// EXPORTS passport
module.exports = function(passport) {
//Funciones serialize & unserialize
    passport.serializeUser(function(user, done) {
        done(null, user.local.id);
    });
    passport.deserializeUser(function(id, done) {
        console.log('Passport.deserializeUser');
        sql[config.dbmode].query("SELECT * from users where ID_key = ?", id, function(err, results){            
            user = new User();
            if(err){
                console.log(err);
                done(err, user);
            }
            user = addUser({id:results[0].ID_key,email:results[0].email,password:results[0].password});
            console.log('Passport.deserializeUser sin errores');
            done(err, user);
        });        
    });

//Passport LocalStrategy
    function newLocalStrategy(callback){
        return new LocalStrategy({
            usernameField : 'email', //Utilizar el email en lugar de un nombre de usuario.
            passwordField : 'password',
            passReqToCallback : true // callback activado
        }, callback);
    };

//REGISTRO con usuario y clave local.
    passport.use('local-signup', newLocalStrategy(function(req, email, password, done) {
// La función no se activa hasta que llega el dato.
        process.nextTick(function() {
// Verificar si el email recibido a través del form existe en la BD.
            //sql.sqlite.connect.get("SELECT COUNT(email) from users where email = ?", email, function(err, result){
            sql[config.dbmode].query("SELECT COUNT(email) from users where email = ?", email, function(err, result){                
                if(err){ 
                    console.log(err);
                    return done(null, false, req.flash('signupMessage', "Imposible conectar con la base de datos."));
                }
//No existe solicitamos signupMessage.
                if(result[0]['COUNT(email)'] > 0){
                        return done(null, false, req.flash('signupMessage', 'Esta cuenta de correo ya ha sido registrada.'));
//Si no existe el usuario, crear el usuario.
                }else{
                    var newUser = new User();
//Almacenamos las credenciales locles del usuario.
                    newUser = addUser({id: newUser.generateHash(email), email: email, password: newUser.generateHash(password)});
                    /*
                    newUser.local.email		= email;
                    newUser.local.password	= newUser.generateHash(password);
                    newUser.local.id    	= newUser.generateHash(email);
                    */
//y las guardamos en la base de datos.                    
                    var values = [newUser.local.email, newUser.local.password, newUser.local.id, 1];
                    sql[config.dbmode].insert("INSERT INTO users (email, password, ID_key, local) values (?,?,?,?)", values, function (err){
                        if(err){
                            console.log(err);
                            return done(null, false, req.flash('signupMessage', 'Imposible conectar con la base de datos. Registro fallido.'));
                        }
                        var data = [0,aux.ahora(),0, email];

                        for(var key in data){console.log(key +": "+data[key]);}
                            
                        sql[config.dbmode].insert("INSERT INTO fonotecasdata (userID, discoID, fechaRegistro, numItems) SELECT userID, ?, ?, ? FROM users WHERE email = ?", data, function(err){
                                if(err){
                                    console.log(err);
                                    sql[config.dbmode].query("DELETE FROM users where email = ?", values[0], function(errr){
                                        if(errr){
                                            console.log(errr);
                                            return done(null, false, req.flash('singupMessage', 'Error en el proceso de registro. Transacción incompleta. Contacte con el administrador.'));
                                        }
                                    });
                                    return done(null, false, req.flash('singupMessage', 'Error en el proceso de registro.'));
                                }
                            });
                        return done(null, newUser);
                    });                    
                }
            });
        });
    }));

// INICIO DE SESION localStrategy.
    passport.use('local-login', newLocalStrategy(function(req, email, password, done){
        theUser = new User();
//Buscar en la base de datos el email introducido en el forulario.
        sql[config.dbmode].query("SELECT COUNT(email), email, password, ID_key from users where email = ?", email, function(err, result){
            if(err){
                return done(null, false, req.flash("loginMessage", "Imposible conectar con la base de datos.")); //En caso de error salimos.
            };            

//Si el usuario no existe Solicitamos el flashdata con el mensaje de error.
            if(result[0]['COUNT(email)'] < 1){
                return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));
            };
//Almacenamos las credenciales del usuario en nuestro objeto "User"...
            theUser = addUser({id: result[0].ID_key, email: email, password: result[0].password});
            //theUser.local.id	= result[0].ID_key;
            //theUser.local.email 	= email;
//Si la password es incorrecta devolvemos el flashdata con el mensaje de error.
                    if(!theUser.validPassword(password, theUser.local.password)){
                            console.log("Password error");
                            return done(null, false, req.flash("loginMessage", "Nombre de usuario o password incorrecto"));
                    };
//Si todo está bien devolvemos el objeto "User" con los datos del usuario.
                    return done(null, theUser);
            });
    }));

//Aux
function addUser(data){
    user = new User();
    for(var key in data){
        user.local[key] = data[key];
    }
    return user;
}
;
function getVal(valor, field){    
    switch(config.dbmode){
        case 'mysql':
            return valor[0];
        case 'sqlite':
            return valor[0][field];
    }    
}
;
//FIN PASSPORT
};
