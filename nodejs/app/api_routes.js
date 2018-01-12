//api_routes.js

var config  = require('g:/IFP/Proyecto/codigo/nodejs/config/config.js');
var path    = require(config.modulos + 'path');
var express = require(config.modulos + 'express');

var sql     = require(path.normalize(config.raiz + "/config/database.js"));


//var wd      = config.raiz;
//var parser 		= require('http-string-parser');

var router	= express.Router();

var error = function(mensaje){
	res.status(500);
	res.send(mensaje);
};

//con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields, next){

router.get('/', function(req, res){	
	sql.conectar().query(sql.canciones.all, function(err,result,fileds, next){
		if(err)
			error("¡Ups! Algo ha fallado.");
		res.send(JSON.stringify(result));
	});
});

//**************************
//CANCIONES
//**************************
//Todas
router.get('/canciones', function(req, res){
	sql.conectar().query(sql.canciones.all, function(err,result, fields){
		if(err)
			error("¡Ups! Algo ha fallado.");		
		console.log(req.url);
		res.send(JSON.stringify(result));
	});
});
//Por disco
router.post('/', function(req, res){
	sql.conectar().query(sql.canciones.all, function(err,result, fields){
		if(err)
			error("¡Ups! Algo ha fallado.");
		console.log("\n\nConsulta al API realizada:\n");
                console.log(JSON.stringify(req.body));
		res.send(JSON.stringify(result));
	});
});

router.get('/:generos()', function(req, res){
	sql.conectar().query(sql.generos.all, function(err, result, fields){
		if(err)
			error("¡Ups! Algo ha fallado.");
		res.send(JSON.stringify(result));
	});
});

module.exports = router;