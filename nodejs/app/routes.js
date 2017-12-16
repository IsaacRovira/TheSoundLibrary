// app/routes.js
module.exports = function(app, passport) {

    // +++++++++++++++++++++++++++++++++++++
    // HOME PAGE
    // +++++++++++++++++++++++++++++++++++++
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // ++++++++++++++++++++++
    // INICIO de sessión
    // ++++++++++++++++++++++
    app.get('/login', function(req, res) {
        // render de la pagina de inicio y passar los flash request.
        res.render('login.ejs', { message: req.flash('loginMessage')}); 
    });

    // Procesar el formulario de inicio de sesión.	
    app.post('/login', passport.authenticate('local-login', {
			successRedirect	: '/profile',
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
        successRedirect : '/login', // una vez registrado el usuario lo enviamos a la pagina de inicio de sesión.
        failureRedirect : '/signup', // En caso de error mostramos otra vez la página de registro.
        failureFlash : true // activar los mensajes flash.
    }));

    // ++++++++++++++++++++++++++++++
    // PROFILE
    // ++++++++++++++++++++++++++++++    
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
			
            user : req.user // get the user out of session and pass to template
			
        });
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