//api_routes.js


var nodeDir	= "F:/Program Files/nodejs/node_modules/";
var express  	= require(nodeDir + 'express');
//var parser 		= require('http-string-parser');
var wd			= "Y:/ifp/semestre4/proyecto/codigo/nodejs/";
var sql	= require(wd+'./config/database.js');

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