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
var configDB	= require(wd + '\\config\\database.js');

//var http		= require('http');



var app      	= express();
var port     	= process.env.PORT || 8080;

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database
var con = mysql.createConnection({
	host: "127.0.0.1",
	port: 3360,
	user: "nodejs",
	password: "node.js",
	database: "soundlib"
});
con.connect(function(err){
	if(err) throw err;
	console.log("Conectado a soundlib");
});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

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
app.listen(port);
console.log('Http server working on port ' + port);