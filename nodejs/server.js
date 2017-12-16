// server.js

// set up ======================================================================
// get all the tools we need
//var nodeDir  = "F:\\Program Files\\nodejs\\";
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var mysql    = require('mysql');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var wd 		 = "Y:\\ifp\\semestre4\\proyecto\\codigo\\nodejs\\";
var configDB = require(wd + '\\config\\database.js');

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

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport);
// load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Http server working on port ' + port);