//api.js

// Cargar modulos.
var config          = require(process.cwd()+'/config/config.js');
var path    = require(config.modulos + 'path');
var express     = require(config.modulos + 'express');
var bodyParser  = require(config.modulos + 'body-parser');
var multer      = require(config.modulos + 'multer');
var upload      = multer();


var app = express();

//Configuración
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Rutas definidas en api_routes.js
var discos = require(path.normalizr(config.raiz +'./app/api_routes.js'));

//Use the Router on the sub route /discos
app.use('/api', discos);

module.exports = api;