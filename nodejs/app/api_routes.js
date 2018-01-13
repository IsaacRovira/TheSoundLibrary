//api_routes.js

var config          = require(process.cwd()+'/config/config.js');
var path    = require(config.modulos + 'path');
var express = require(config.modulos + 'express');

var sql     = require(path.normalize(config.raiz + "/config/database.js"));


//var wd      = config.raiz;
//var parser 		= require('http-string-parser');

var router	= express.Router();

var error = function(mensaje, res){
	res.status(500);
	res.send(mensaje);
};

//con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields, next){

router.get('/', function(req, res){	
        console.log("Consulta GET recibida"); 
        //console.log(req);
	sql.conectar().query(sql.canciones.all, function(err,result,fileds){
            if(err)
                error("Ups! Algo ha fallado.",res);
            
            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.status(201).json(result);
            res.end();
	});
});

//**************************
//CANCIONES
//**************************
//Todas
router.get('/canciones', function(req, res){
	sql.conectar().query(sql.canciones.all, function(err,result, fields){
            if(err)
                error("¡Ups! Algo ha fallado.",res);		
            console.log(req.url);            
            res.status(200);
            res.send(JSON.stringify(result));
	});
});

//Por disco
router.post('/', function(req, res){
        console.log("\n\nConsulta POST recibida.");        
        
	sql.conectar().query(sql.discos.all, function(err, result, fields){
            if(err)
                error("¡Ups! Algo ha fallado.",res);            
            
            res.set({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });            
            res.status(201).json(result);
            res.end();
	});
});

router.get('/:generos()', function(req, res){
	sql.conectar().query(sql.generos.all, function(err, result, fields){
            if(err)
                error("¡Ups! Algo ha fallado.",res);
            res.status(200);	
            res.send(JSON.stringify(result));
	});
});

module.exports = router;