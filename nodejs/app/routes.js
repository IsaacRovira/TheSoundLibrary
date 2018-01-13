// app/routes.js

var config          = require(process.cwd()+'/config/config.js');

module.exports = function(app, passport) {

    // +++++++++++++++++++++++++++++++++++++
    // HOME
    // +++++++++++++++++++++++++++++++++++++

    app.get('/', function(req, res) {
        //res.sendFile(('/index.ejs'));
	res.render('index.ejs');
	//console.log(res);
    });

    // ++++++++++++++++++++++
    // INICIO de sessi�n
    // ++++++++++++++++++++++
    app.get('/login', function(req, res) {
        // pagina de inicio y passar los flash request.
        res.render('login.ejs', { message: req.flash('loginMessage')}); 
    });

    // Procesar el formulario de inicio de sesión.	
    app.post('/login', passport.authenticate('local-login', {
			successRedirect	: '/mysoundlib',
			failureRedirect	: '/login', //si falla el inicio de sesión volvemos a mostrar la pagina.
			failureFlash: true //Mensajes flash activados.
	}));

    // ++++++++++++++++++++++
    // REGISTRO de usuarios.
    // ++++++++++++++++++++++
    app.get('/signup', function(req, res) {

        // render de la pagina de registro y passar los flash request.
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    //Procesar el formulario de registro.
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/mysoundlib', // una vez registrado el usuario lo enviamos a la pagina de inicio de sesión.
        failureRedirect : '/signup', // En caso de error mostramos otra vez la página de registro.
        failureFlash : true // activar los mensajes flash.
    }));

    // ++++++++++++++++++++++++++++++
    // PROFILE
    // ++++++++++++++++++++++++++++++    
    // PAra la verificaci�n del registro; muestra usario, id y pass.
    app.get('/profile', isLoggedIn, function(req, res) {        
        res.render('profile.ejs', {			
            user : req.user // get the user out of session and pass to template			
        });
    });
    
    // ++++++++++++++++++++++++++++++
    // Soundlib data
    // ++++++++++++++++++++++++++++++    
    // Acceso a los datos de la fonoteca
    app.get('/mysoundlib', isLoggedIn, function(req, res) {
        res.sendFile((config.raiz + '/views/testjs.html'),{
            user : req.user // Cierra la sesi�n del usuario.
        });
        /*
        const fs = require(config.modulos + 'read-file');
        fs('./views/testjs.html', 'utf8', function(err, text){
            if(err)
                error(mensaje, res);
            res.status(200);
            res.send(text, {
                user : req.user // Cierra la sesi�n del usuario.
            });
        });
         */   
    });
	
    
    //TESTING.....
    app.get('/api', isLoggedIn, function(req, res){
            res.render('api.ejes');
    });

    // ++++++++++++++++++++++++++++++
    // LOGOUT
    // ++++++++++++++++++++++++++++++
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}