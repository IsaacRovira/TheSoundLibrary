// app/routes.js

var config          = require(process.cwd()+'/config/config.js');
var cookie  ={
    domain:     'TheSoundLibrary',
    path:       '/mysoundlib',
    secure:     false,
    userID:     'user.local.id',
    expires:    new Date(Date.now()+ 600000),
    httpOnly:   true
};

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
    // INICIO de sessión
    // ++++++++++++++++++++++
    app.get('/login', function(req, res) {
        // pagina de inicio y passar los flash request.        
        res.render('login.ejs', { message: req.flash('loginMessage')}); 
    });

    // Procesar el formulario de inicio de sesiÃ³n.	
    app.post('/login', passport.authenticate('local-login', {
			successRedirect	:	'/mysoundlib',
			failureRedirect	:	'/login', //si falla el inicio de sesiÃ³n volvemos a mostrar la pagina.
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
        successRedirect : '/mysoundlib', // una vez registrado el usuario lo enviamos a la pagina de inicio de sesiÃ³n.
        failureRedirect : '/signup', // En caso de error mostramos otra vez la pÃ¡gina de registro.
        failureFlash : true // activar los mensajes flash express.
    }));

    // ++++++++++++++++++++++++++++++
    // Soundlib data
    // ++++++++++++++++++++++++++++++    
    // Acceso a los datos de la fonoteca;
    app.get('/mysoundlib', isLoggedIn, function(req, res) {
        //res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        //res.cookie('userID', user.local.id, {path: '/mysoundlib', secure: false, expires: new Date(Date.now()+ 600000), httpOnly: true});
        //res.set('Set-Cookie', 'userID='+ user.local.id+"; path=/mysoundlib");
        res.sendFile((config.raiz + '/views/main.html'),{            
            user : req.user // Cierra la sesión del usuario.
        });
        /*
        res.render('main.ejs', {			
                user : req.user  
        });
        */
    });

    // ++++++++++++++++++++++++++++++
    // LOGOUT
    // ++++++++++++++++++++++++++++++
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// isLoggedIn verifica que el usuario haya iniciado sesión.
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){//Verificar si el usuario ha iniciado sesión.        
        return next();
    }
    res.redirect('/'); //Usuarios no identificados a la página de inicio.
}