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

    // =========================================================================
    // Registro LOCAL
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
				
        // Verificar si el email recibido existe.
		con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields){
			if(err) done(err);
			if(result[0].email < 1){
				return done(null, false, req.flash('signupMessage', 'Esta cuenta de correo ya ha sido registrada.'));
			}else{
				
                // Si no existe el usuario, crear el usuario.
                var newUser = new User();

                // Credenciales locles del usuario.
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
				//newUser.local.id_key = newUser.generateHash(email);
				
                // Guardar los datos en la base de datos.
				var values = [newUser.locla.email,newUser.local.password,1];
				
				con.query("INSERT INTO Users (Email, password, local) values (?,?,?)", values, function (err, result, fileds){
					if(err)
						done(err);
					return done(null, newUser);
                });
            }

        });    

        });

    }));

};