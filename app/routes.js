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
			successRedirect	:	'/mysoundlib',
			failureRedirect	:	'/login', //si falla el inicio de sesión volvemos a mostrar la pagina.
			failureFlash: true //Mensajes flash activados.
	}));

    // ++++++++++++++++++++++
    // REGISTRO de usuarios.
    // ++++++++++++++++++++++
    app.get('/signup', function(req, res) {
		
        // enviar la pagina de registro y passar los flash request.
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    //Procesar el formulario de registro.
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/mysoundlib', // una vez registrado el usuario lo enviamos a la pagina de inicio de sesión.
        failureRedirect : '/signup', // En caso de error mostramos otra vez la página de registro.
        failureFlash : true // activar los mensajes flash.
    }));

    // ++++++++++++++++++++++++++++++
    // Soundlib data
    // ++++++++++++++++++++++++++++++    
    // Acceso a los datos de la fonoteca;
    app.get('/mysoundlib', isLoggedIn, function(req, res) {        
        res.set('Set-Cookie', 'username='+user.local.id+"; path=/mysoundlib");
        res.sendFile((config.raiz + '/views/main.html'),{            
            user : req.user // Cierra la sesi�n del usuario.
        });
        /*
        res.render('main.ejs', {			
                user : req.user  
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

// isLoggedIn verifica que el usuario haya iniciado sesi�n.
function isLoggedIn(req, res, next) {    
    if (req.isAuthenticated()) //Verificar si el usuario ha iniciado sesi�n.
        return next();
    
    res.redirect('/'); //Usuarios no identificados a la p�gina de inicio.
}