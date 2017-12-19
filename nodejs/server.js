// server.js

// set up ======================================================================
// get all the tools we need
var nodeDir	= "F:\\Program Files\\nodejs\\node_modules\\";
var mongoose	= require(nodeDir + 'mongoose');
var express  	= require(nodeDir + 'express');
var mysql    	= require(nodeDir + 'mysql');
var passport 	= require(nodeDir + 'passport');
var flash    	= require(nodeDir + 'connect-flash');
var morgan      = require(nodeDir + 'morgan');
var cookieParser= require(nodeDir + 'cookie-parser');
var bodyParser  = require(nodeDir + 'body-parser');
var session     = require(nodeDir + 'express-session');
var wd			= "Y:\\ifp\\semestre4\\proyecto\\codigo\\nodejs\\";
//var configDB	= require('./config/database.js');
var router		= require('./app/api_routes.js');
//+++++++++++++++++++++++++++
// CONFIGURACIÓN
//+++++++++++++++++++++++++++


//******************************************
var api			= express();
api.use(cookieParser());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
//api.use(upload.array());
var sql = require('./app/api_routes.js');
api.use('/api', sql);

//**********************************************
var app      	= express();
var port     	= process.env.PORT || 8080;

var con = mysql.createConnection({
	host: "127.0.0.1",
	port: 3360,
	user: "nodejs",
	password: "node.js",
	database: "soundlib"
});


require('./config/passport')(passport); // pass passport for configuration

//Función para inforar de los errores.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(function(err, req, res, next) {
   res.status(500);
   res.send("Oops, something went wrong with db connection.")
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Configurar app (Express)
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static('public'));

// required for passport
app.use(session({
	secret: 'menudamierdadecurso',// session secret
	reserve: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport);
// load our routes and pass in our app and fully configured passport

// launch ======================================================================
con.connect(function(err, next){
	if(err) next(err);
	console.log("Conectado a soundlib");
});
app.listen(port);
console.log('Http server working on port ' + port);
api.listen(3030);
