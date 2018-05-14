//data_routes.js

var config          = require(process.cwd()+'/config/config.js');
var path            = require(config.modulos + 'path');
var express         = require(config.modulos + 'express');
var mysql           = require(config.modulos + 'mysql');
var sql             = require(path.normalize(config.raiz + "/config/database.js"));



var data_router	= express.Router();
var error = function(mensaje, res){
	res.status(500);
	res.send(mensaje);
};

//DB +++++++++++++++++++++++++++++
var con = mysql.createConnection({
        host: config.sql.ip,
        port: config.sql.port,
        user: config.sql.user,
        password: config.sql.pass,
        database: config.sql.db
});
//++++++++++++++++++++++++++++++++++++

//***************
//POST => REQUEST
//***************
//FONOTECA CANCIONES
data_router.post('/fonotecas/canciones', function(req, res){
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
                        i=datos.length; //No a�adimos m�s campos.
                    }
                    break;
                    //Es necesario a�adir la tabla para eliminar la ambiguedad en la sentencia SQL.
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
            error("�Ups! Algo ha fallado.",res);
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

//FONOTECA DISCOS
data_router.post('/fonotecas/discos', function(req, res){   
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
                        //Es necesario a�adir la tabla al campo para eliminar la ambiguedad en la sentencia SQL.
                        string = updateStringEqual(datos[i][1], string, "discos."+datos[i][0]);
                        i=datos.length; //No a�adimos m�s campos.
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
            error("�Ups! Algo ha fallado.",res);
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

//CANCIONES
data_router.post('/canciones', function(req, res){    
    //logCtrl(req,"Request Canciones.");
    
    var errMsg=function(str){
        err(str,res);
        res.end();
    };
    
    var datos={
       artistas     : req.body.artistas,
       cancionId    : req.body.cancionId,
       discoId      : req.body.discoId,
       duracion     : req.body.duracion,
       pista        : req.body.pista,
       titulo       : req.body.titulo,
       userid       : req.body.userid,
       max          : req.body.max
    };
    var string = buildSqlValues(datos);
    
    //Encabezado
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    var consulta = function(cadena){
        if(cadena.length > 0){
            console.log('\n' + sql.canciones.by_Any + cadena + '\n');
            
            sql.conectar().query(sql.canciones.by_Any + cadena, function(err, result){
                if(err){
                    error("�Ups! Algo ha fallado.",res);
                    console.log("Error query canciones: " + err);
                }else{
                    if(JSON.stringify(result).length< 3){
                        res.status(404).json({errors: ['Canci�n no encontrada']});
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
                    error("�Ups! Algo ha fallado.",res);
                    console.log("Error query canciones: " + err);
                }else{
                    //console.log(JSON.stringify(result));
                    res.status(201).json(result);
                    res.end();
                }
            });
        }
    };
    
    checkUserId(datos['userid'], res, consulta(string));
});
//END data_router.post Canciones

//FUNCIONES
function logCtrl(req, titulo){
    console.log(titulo + "\n");
    for(var key in req){
        var text;        
        switch(key){            
            case 'body':
                for(var n in req[key]){console.log("\n" + key + ": "+ n + ": " + req[key][n]+ "\n")};
                 break;
            case 'sessionID': console.log("\n" + key + ": "+ req[key] + "\n");break;
            default: text+=key+" || ";break;
        }        
    }
   //console.log(text);
};
var buildSqlValues = function(datos){
    var string = "";
    for(var key in datos){
        switch(key){
            case 'userid':break;
            case 'max':
                var max;
                if(datos[key]!=null) max = " limit " + mysql.escape(datos[key]);
                break;
            default:
                if(datos[key]!=null){
                    string = updateStringLike(datos[key], string, key);
                }
        }
    };
    if(max!=null)string+=max;      
    return string;
};
function updateStringLike(valor, string, campo){   
    if(string.length > 0){
            string += " and ";
        }
    return string += campo + " like " + mysql.escape("%"+valor+"%");
};
function updateStringEqual(valor, string, campo){
    if(string.length > 0){
            string += " and";
        }
    return string += " " + campo + " = " + mysql.escape(valor);
};

// DISCOS
data_router.post('/discos', function(req, res){
    logCtrl(req, "Request Discos.");
    
    //Encabezado
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'        
    });
    
    var datos={
        'discoId': req.body.discoId,
        'album': req.body.album,
        'artista': req.body.artista,
        'year': req.body.year,
        'sello': req.body.sello,
        'discografica': req.body.discografica,
        'etiquetado': req.body.etiquetado,
        'genero': req.body.genero,
        'identificadores': req.body.identificadores,
        'tipo': req.body.tipo,
        'userid': req.body.userid
    };
    var string = buildSqlValues(datos);
    
    function qryData(str){
        if(str.length > 0){
            sql.conectar().query(sql.discos.by_Any + str, function(err, result){                                
                if(err){
                    console.error("Error query discos: " + err);
                    return res.status(404).json({errors: ['Error conectando a la DB']}).end();
                }
                if(JSON.stringify(result).length<3) return res.status(404).json({errors: ['Disco no encontrado']}).end();
                return res.status(201).json(result).end();
            });
        }else{
            sql.conectar().query(sql.discos.all, function(err, result){
                if(err){
                    console.error("Error query discos: " + err);
                    return res.status(404).json({errors: ['Error conectando a la DB']}).end();
                }
                return res.status(201).json(result).end()
            });
        }
    };
    function usrCheck(user, query){
        sql.conectar().query(sql.users.by_id_key + mysql.escape(user), function(err,result){
                if(err){
                    console.error("Error query usuarios: " + err);
                    return res.status(404).json({error: ['Error de conexi�n a la base de datos']}).end();
                }
                if(result[0]['ID_key']===user){
                    console.log("\nRequest by user: " +result[0]['Email']+'\n');
                    return query;
                }
                return res.status(404).json({error: ['Usuario desconocido']}).end();
            }); 
    };
    
    if(datos['userid']!=null)return usrCheck(datos['userid'],qryData(string, res));
    return res.status(404).json({error: ['Usuario desconocido']}).end();
});
//END data_router.post discos


module.exports = data_router;