// server.js

console.log(process.cwd());
var config      = require(process.cwd()+'\\config\\config.js');
var path        = require(config.modulos + 'path');

var api         = require(path.normalize(config.raiz + '/app/api/api.js'));
var app         = require(path.normalize(config.raiz + '/app/web/web.js'));

var port     	= process.env.PORT || config.http.port;

app.listen(port);
console.log('Http server working on port ' + port);

api.listen(config.api.port);
console.log('API listen on port ' + config.api.port);



//+++++++++++++++++++++++++++
// CONFIGURACIÃ“N
//+++++++++++++++++++++++++++
//********************************
/*
//API 
//*************************************************************************************
//var sql_api                 = require(path.normalize(config.raiz + '/app/api_routes.js'));

//var api	= express();
//api.use(cookieParser());
//api.use(bodyParser.json());
//api.use(bodyParser.urlencoded({extended: true}));
//api.use('/api', sql_api);

//WEB
//**************************************************************************************
var sql_app		= require(path.normalize(config.raiz + '/app/data_routes.js'));
var app      	= express();
var port     	= process.env.PORT || config.http.port;

require(path.normalize(config.raiz + '/config/passport'))(passport); // pass passport for configuration
var app      	= express();
// Configurar app (Express)
app.use(bodyParser.urlencoded({extended: true})); // get information from html forms 
app.use(morgan('dev')); // log en la consola.
app.use(cookieParser()); // cookies
app.use(bodyParser.urlencoded({extended: true})); // html forms
app.use(bodyParser.json());
app.set('view engine', 'ejs');      //lanzar EJS
app.use(express.static('public'));  //public donde estáran todos los ficheros accesibles.

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
//require(path.normalize(config.raiz + '/app/data_routesPass.js'))(app, passport);
//Cargar las rutas y el passport.
require(path.normalize(config.raiz + '/app/routes.js'))(app, passport);

//FunciÃ³n para informar de los errores.
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get('/', function(req, res){
   //Create an error and pass it to the next function
   var err = new Error("");
   next(err);
});


app.use(function(err, req, res, next) {
    console.log("Error: "+ err);    
    /* SWITCH CON TODOS LOS CÓDIGOS DE ERROR Q VAMOS A GESTIONAR
    switch(err.code){
       case 'ECONNREFUSED': res.status(500).send('Error de conexión a la base de datos'); break;
       default: res.status(500).send('ERROR DESCONOCIDO');           
   
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