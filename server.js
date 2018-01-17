// server.js


var config          = require(process.cwd()+'\\config\\config.js'); 
var path        = require(config.modulos + 'path');

console.log(process.cwd());

var mongoose	= require(config.modulos + 'mongoose');
var express  	= require(config.modulos + 'express');
var mysql    	= require(config.modulos + 'mysql');
var passport 	= require(config.modulos + 'passport');
var flash    	= require(config.modulos + 'connect-flash');
var morgan      = require(config.modulos + 'morgan');
var cookieParser= require(config.modulos + 'cookie-parser');
var bodyParser  = require(config.modulos + 'body-parser');
var session     = require(config.modulos + 'express-session');


//+++++++++++++++++++++++++++
// CONFIGURACIÓN
//+++++++++++++++++++++++++++

//DB
//********************************
var con = mysql.createConnection({
	host: config.sql.ip,
	port: config.sql.port,
	user: config.sql.user,
	password: config.sql.pass,
	database: config.sql.db
});
//********************************

//API 
//*************************************************************************************
var router		= require(path.normalize(config.raiz + '/app/api_routes.js'));
var sql                 = require(path.normalize(config.raiz + '/app/api_routes.js'));

var api	= express();

api.use(cookieParser());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use('/api', sql);

//Express
//**************************************************************************************
var app      	= express();
var port     	= process.env.PORT || config.http.port;

require(path.normalize(config.raiz + '/config/passport'))(passport); // pass passport for configuration

// Configurar app (Express)
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms 
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'));

// Configura passport
app.use(session({
	secret: 'estecursoesunaestafa',// session secret
	reserve: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

//Cargar las rutas y el passport.
require(path.normalize(config.raiz + '/app/routes.js'))(app, passport);

//Función para informar de los errores.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
app.get('/', function(req, res){
   //Create an error and pass it to the next function
   var err = new Error("");
   next(err);
});
*/
app.use(function(err, req, res, next) {
    console.error(err);  
    
    switch(err.code){
       case 'ECONNREFUSED': res.status(500).send('Error de conexi�n a la base de datos'); break;
       default: res.status(500).send('ERROR DESCONOCIDO');
   }
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Run node run
/*
con.connect(function(err, next){
	if(err){
            console.log(err);            
        }else{
            console.log("Conectado a soundlib");
        }	
});
*/
app.listen(port);
console.log('Http server working on port ' + port);
api.listen(config.api.port);
console.log('API listen on port ' + config.api.port);