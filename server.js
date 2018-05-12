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
var sql_app		= require(path.normalize(config.raiz + '/app/data_routes.js'));
var sql_api                 = require(path.normalize(config.raiz + '/app/api_routes.js'));

var api	= express();

api.use(cookieParser());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use('/api', sql_api);

//Express
//**************************************************************************************
var app      	= express();
var port     	= process.env.PORT || config.http.port;

require(path.normalize(config.raiz + '/config/passport'))(passport); // pass passport for configuration

// Configurar app (Express)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms 
app.use(morgan('dev')); // log en la consola.
app.use(cookieParser()); // cookies
app.use(bodyParser.urlencoded({extended: true})); // html forms
app.use(bodyParser.json());
app.set('view engine', 'ejs');      //lanzar EJS
app.use(express.static('public'));  //public donde est�ran todos los ficheros accesibles.

// Configura passport
app.use(session({
	secret: 'encriptalotodo',
	reserve: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

app.use('/', sql_app);

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
    console.log("Error: "+ err);    
    /* SWITCH CON TODOS LOS C�DIGOS DE ERROR Q VAMOS A GESTIONAR
    switch(err.code){
       case 'ECONNREFUSED': res.status(500).send('Error de conexi�n a la base de datos'); break;
       default: res.status(500).send('ERROR DESCONOCIDO');           
   }*/
   //next();
   next({type: 'TIPO_DE_ERROR', error: 'CUENTANOS ALGO'});
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