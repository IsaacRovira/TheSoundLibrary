//api.js

// Cargar modulos.
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


var app = express();

//Configuración
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Rutas definidas en api_routes.js
var discos = require('./app/api_routes.js');

//Use the Router on the sub route /movies
app.use('/api', discos);

module.exports = api;