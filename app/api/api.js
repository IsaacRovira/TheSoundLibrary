//api.js

//JS
var config      = require(process.cwd()+'/config/config.js');
var path        = require(config.modulos + 'path');

// Cargar modulos.
var cookieParser= require(config.modulos + 'cookie-parser');
var express     = require(config.modulos + 'express');
var bodyParser  = require(config.modulos + 'body-parser');
var morgan      = require(config.modulos + 'morgan');
//var multer      = require(config.modulos + 'multer');
//var upload      = multer();
//Rutas definidas en api_routes.js
var data = require(path.normalize(config.raiz + '/app/api/api_routes.js'));
var api = express();
//Configuración
api.use(morgan('dev'));
api.use(cookieParser());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
//api.use(upload.array());

//Use the Router on the sub route /discos
//api.use('/api', data);
api('/api', data);
module.exports = api;