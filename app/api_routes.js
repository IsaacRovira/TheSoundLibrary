//api_routes.js

var config          = require(process.cwd()+'/config/config.js');
var path            = require(config.modulos + 'path');
var express         = require(config.modulos + 'express');

var sql             = require(path.normalize(config.raiz + "/config/database.js"));



//var wd      = config.raiz;
//var parser 		= require('http-string-parser');

var router	= express.Router();

var error = function(mensaje, res){
	res.status(500);
	res.send(mensaje);
};

//con.query("SELECT count(email) as email from Users where email = ?", email, function(err, result, fields, next){


router.get('/canciones', function(req, res){
	sql.conectar().query(sql.canciones.all, function(err,result, fields){
            if(err)
                error("¡Ups! Algo ha fallado.",res);		
            console.log(req.url);            
            res.status(200);
            res.send(JSON.stringify(result));
	});
});
router.get('/generos', function(req, res){
	sql.conectar().query(sql.generos.all, function(err, result, fields){
            if(err)
                error("¡Ups! Algo ha fallado.",res);
            res.status(200);	
            res.send(JSON.stringify(result));
	});
});

//************************************************************************************************************************************************************************
//
//POST => REQUEST
//
//************************************************************************************************************************************************************************

//************************************************************************************************************************************************************************
//FONOTECA CANCIONES
//************************************************************************************************************************************************************************

router.post('/fonotecas/canciones', function(req, res){
    console.log("Request fonotecas/canciones");
   
   //datos del body  
   var datos=[
       ['cancionId', req.body.cancionId],
       ['artistas', req.body.artistas],       
       ['discoId', req.body.discoId],
       ['duracion', req.body.duracion],
       ['pista', req.body.pista],
       ['titulo', req.body.titulo],
       ['userid', req.body.userid]
    ];
    
    //Generamos el string para la consulta SQL
    var string = ' ';
    for(var i =0; i < datos.length; i++){
        switch(i){
                case 0: if(datos[i][1]){
                        string = updateStringEqual(datos[i][1], string, datos[i][0]);
                        i=datos.length; //No añadimos más campos.
                    }
                    break;
                    //Es necesario añadir la tabla para eliminar la ambiguedad en la sentencia SQL.
                case 2: if(datos[i][1]) string = updateStringEqual(datos[i][1], string, "discos."+datos[i][0]);
                    break;
                case 3:
                case 4: if(datos[i][1]) string = updateStringEqual(datos[i][1], string, datos[i][0]);
                    break;
                case 6: break;
                default: if(datos[i][1]) string = updateStringLike(datos[i][1], string, datos[i][0]);
                    break;                    
        }
    }
    
    //Encabezado
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
        
    sql.conectar().query(sql.fonotecas.canciones + string, req.body.userid,  function(err, result){
       if(err){
            error("¡Ups! Algo ha fallado.",res);
            console.log("Error query canciones fonoteca: " + err);
        }else{
            if(JSON.stringify(result).length< 3){
                res.status(404).json({errors: ['Ninguna coincidencias']});
                res.end();
            }else{                    
                res.status(201).json(result);
                res.end();
            }
        }
    });
});

//************************************************************************************************************************************************************************
//FONOTECA DISCOS
//************************************************************************************************************************************************************************
router.post('/fonotecas/discos', function(req, res){   
    console.log("Request fonotecas/discos");
    //Datos del body
    var datos=[
        ['discoId', req.body.discoId],
        ['album', req.body.album],
        ['artista', req.body.artista],
        ['year', req.body.year],
        ['sello', req.body.sello],
        ['etiquetado', req.body.etiquetado],
        ['genero', req.body.genero],
        ['identificadores', req.body.identificadores],
        ['tipo', req.body.tipo],
        ['userid', req.body.userid]
    ];   
   
    var string =" ";
    for(var i =0; i < datos.length; i++){
        switch(i){
                case 0: if(datos[i][1]){
                        //Es necesario añadir la tabla al campo para eliminar la ambiguedad en la sentencia SQL.
                        string = updateStringEqual(datos[i][1], string, "discos."+datos[i][0]);
                        i=datos.length; //No añadimos más campos.
                    }
                    break;
                case 3:  if(datos[i][1]) string = updateStringEqual(datos[i][1], string, datos[i][0]);
                    break;
                case 9: break;
                default: if(datos[i][1]) string = updateStringLike(datos[i][1], string, datos[i][0]);
                    break;
        }
    }
        
    //Encabezado
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    sql.conectar().query(sql.fonotecas.discos + string, req.body.userid, function(err, result){
        if(err){
            error("¡Ups! Algo ha fallado.",res);
            console.log("Error query discos: " + err);
        }else{                
            if(JSON.stringify(result).length<3){
                res.status(404).json({errors: ['Ninguna conincidencia']});
                res.end();
            }else{    
                res.status(201).json(result);
                res.end();
            }                
        }                
    });    
});

//************************************************************************************************************************************************************************
//CANCIONES
//************************************************************************************************************************************************************************
router.post('/canciones', function(req, res){
    console.log("Request canciones");
    console.log(JSON.stringify(req.body));
    //Datos del body
    var datos=[
       ['artistas', req.body.artistas],
       ['cancionId', req.body.cancionId],
       ['discoId', req.body.discoId],
       ['duracion', req.body.duracion],
       ['pista', req.body.pista],
       ['titulo', req.body.titulo],
       ['userid', req.body.userid]
    ];
    
    //Generamos el string para la consulta SQL
    var string = "";
    for(var i =0; i < datos.length; i++){
        switch(i){
                case 1: if(datos[i][1]){
                        string = updateStringEqual(datos[i][1], string, datos[i][0]);
                        i=datos.length; //No añadimos más campos.
                    }
                    break;
                case 2:                    
                case 3:
                case 4: if(datos[i][1]) string = updateStringEqual(datos[i][1], string, datos[i][0]);
                    break;
                case 6:break;
                default: if(datos[i][1]) string = updateStringLike(datos[i][1], string, datos[i][0]);
                    break;
        }
    }
    
    //Encabezado
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    console.log(JSON.stringify(datos));
    if(isBody(datos)){
        console.log(string);
        //var sqlquery= "SELECT cancionID, DiscoID, Artistas, Duracion, Pista, Titulo FROM canciones where ";
        sql.conectar().query(sql.canciones.by_Any + string, function(err, result){
            if(err){
                error("¡Ups! Algo ha fallado.",res);
                console.log("Error query canciones: " + err);
            }else{
                if(JSON.stringify(result).length< 3){
                    res.status(404).json({errors: ['Canción no encontrada']});
                    res.end();
                }else{                    
                    res.status(201).json(result);
                    res.end();
                }
            }            
        });
    }else{
        sql.conectar().query(sql.canciones.all, function(err, result, fields){
            if(err){
                error("¡Ups! Algo ha fallado.",res);
                console.log("Error query canciones: " + err);
            }else{
                console.log(JSON.stringify(result));
                res.status(201).json(result);
                res.end();
            }
	});
    }    
});

//************************************************************************************************************************************************************************
// DISCOS
//************************************************************************************************************************************************************************
router.post('/discos', function(req, res){   
    console.log("Request discos");
    //Datos del body
    var datos=[
        ['discoId', req.body.discoId],
        ['album', req.body.album],
        ['artista', req.body.artista],
        ['year', req.body.year],
        ['sello', req.body.sello],
        ['etiquetado', req.body.etiquetado],
        ['genero', req.body.genero],
        ['identificadores', req.body.identificadores],
        ['tipo', req.body.tipo],
        ['userid', req.body.userid]
    ];
    
    var string ="";
    for(var i =0; i < datos.length; i++){
        switch(i){
                case 0: if(datos[i][1]){
                        string = updateStringEqual(datos[i][1], string, datos[i][0]);
                        i=datos.length; //No añadimos más campos.
                    }
                    break;
                case 3:  if(datos[i][1]) string = updateStringEqual(datos[i][1], string, datos[i][0]);
                    break;
                case 9: break;
                default: if(datos[i][1]) string = updateStringLike(datos[i][1], string, datos[i][0]);
                    break;
        }
    }    
    
    //Encabezado
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'        
    });
    
    if(isBody(datos)){
        console.log(string);
        sql.conectar().query(sql.discos.by_Any + string, function(err, result){
            if(err){
                error("¡Ups! Algo ha fallado.",res);
                console.log("Error query discos: " + err);
            }else{                
                if(JSON.stringify(result).length<3){
                    res.status(404).json({errors: ['Disco no encontrado']});
                    res.end();
                }else{
                    res.status(201).json(result);
                    res.end();
                }                
            }                
        });
    }else{
        sql.conectar().query(sql.discos.all, function(err, result){
            if(err){
                error("¡Ups! Algo ha fallado.",res);
                console.log("Error query discos: " + err);
            }else{
                console.log(JSON.stringify(result));
                res.status(201).json(result);
                res.end();
            }            
	});
    }	
});

//************************************************************************************************************************************************************************
//
//
//Funciones auxiliares
//
//
//************************************************************************************************************************************************************************

function updateStringLike(valor, string, campo){   
    if(string.length > 0){
            string += " and";
        }
    return string += " " + campo + " like '%" + valor + "%'";
};

function updateStringEqual(valor, string, campo){
    if(string.length > 0){
            string += " and";
        }
    return string += " " + campo + "=" + valor;
};

function isBody(data){
    for(var i=0; i< data.length; i++){
        if(data[i][1]) return true;
    }
    return false;
};

module.exports = router;