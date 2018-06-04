//web.js


var config      = require(process.cwd()+'\\config\\config.js');
var path        = require(config.modulos + 'path');

//JS
var config      = require(process.cwd()+'\\config\\config.js');
//var sql_app	= require(path.normalize(config.raiz + '/app/web/data_routespass.js'));
var sql_app	= require(path.normalize(config.raiz + '/app/web/data_routes.js'));
var routes      = require(path.normalize(config.raiz + '/app/web/routes.js'));
var pass    = require(path.normalize(config.raiz + '/config/passport'));

//Modulos
var express  	= require(config.modulos + 'express');
var passport 	= require(config.modulos + 'passport');
var flash    	= require(config.modulos + 'connect-flash');
var morgan      = require(config.modulos + 'morgan');
var cookieParser= require(config.modulos + 'cookie-parser');
var bodyParser  = require(config.modulos + 'body-parser');
var session     = require(config.modulos + 'express-session');

// Configurar app (Express)
var app      	= express();
app.use(morgan('dev')); // log en la consola.
app.use(cookieParser()); // cookies
app.use(bodyParser.urlencoded({extended: true})); // html forms
app.use(bodyParser.json());
app.use(express.static('public'));  //public donde estáran todos los ficheros accesibles.
app.set('view engine', 'ejs');      //lanzar EJS

// Configura passport
app.use(session({
	secret: 'encriptalotodo',
	resave: true,
	saveUninitialized: true
}));

pass(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

//Cargar las rutas y el passport.
routes(app, passport);
sql_app(app);

module.exports = app;



//cookieParser
//var secrets = ['TheBodyFluids', 'SystemRestart', 'RedRossesToo'];