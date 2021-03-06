// app/data_routesPass.js

var config          = require(process.cwd()+'/config/config.js');
var path            = require(config.modulos + 'path');
var sql             = require(path.normalize(config.raiz + "/config/database.js"));


module.exports = function(data_router) {

    var error = function(mensaje, res){
            res.status(500);
            res.send(mensaje);
    };

    //FONOTECA CANCIONES
    data_router.post('/fonotecas/canciones', isLoggedIn, function(req, res){
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

        sql.connect().query(sql.fonotecas.canciones + string, req.body.userid,  function(err, result){
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
    data_router.post('/fonotecas/discos', isLoggedIn, function(req, res){   
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

        sql.connect().query(sql.fonotecas.discos + string, req.body.userid, function(err, result){
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
    data_router.post('/canciones', isLoggedIn, function(req, res){
        //Datos del body
        console.log("Canciones\n");
        for(var key in req){
            var text;        
            switch(key){
                case 'Cookie': console.log("\n" + key + ": "+ req[key]+ "\n"); break;
                case 'body':
                    for(var n in req[key]){console.log("\n" + key + ": "+ n + ": " + req[key][n]+ "\n");};
                     break;
                case 'sessionID': console.log("\n" + key + ": "+ req[key] + "\n");break;
                default: text+=key+" || ";break;
            }        
        }
       //console.log(text);

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

        //Generamos el string para la consulta SQL
        var string = "";
        for(var key in datos){
            switch(key){
                    case 'userid':
                        //console.log(key + ' = ' + datos[key]);
                        break;
                    case 'max':

                    break;
                    default:
                        if(datos[key]!= null){
                            string = updateStringLike(datos[key], string, key);
                        }
            }
        }

        //Encabezado
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        var consulta = function(cadena){
            if(cadena.length > 0){
                console.log('\n' + sql.canciones.by_Any + cadena + '\n');
                sql.connect().query(sql.canciones.by_Any + string, function(err, result){
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
                sql.connect().query(sql.canciones.all, function(err, result, fields){
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

        if(datos['userid']!= null){
            sql.connect().query(sql.users.all, function(err,result){
                if(err){
                    error("Algo no ha salido bien.", res);
                    console.log("Error query usuarios: " + err);
                    res.end();
                }else{
                    for(var key in result){
                        if(result[key]['ID_key']===datos['userid']){
                            console.log("\nRequest canciones user: " +result[key]['Email']+'\n');
                            return consulta(string);
                        }
                    }
                    error("Error de autenticaci�n");
                    console.log("LogIn error user: " + datos['userid'] + ".");
                    res.end();
                    }
                });
            }
    });

    // DISCOS
    data_router.post('/discos', isLoggedIn, function(req, res){   
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
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'        
        });

        if(isBody(datos)){
    //        console.log(string);
            sql.connect().query(sql.discos.by_Any + string, function(err, result){
                if(err){
                    error("�Ups! Algo ha fallado.",res);
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
            sql.connect().query(sql.discos.all, function(err, result){
                if(err){
                    error("�Ups! Algo ha fallado.",res);
                    console.log("Error query discos: " + err);
                }else{
    //console.log(JSON.stringify(result));
                    res.status(201).json(result);
                    res.end();
                }            
            });
        }	
    });
};

// isLoggedIn verifica que el usuario haya iniciado sesi�n.
function isLoggedIn(req, res, next) {    
    if (req.isAuthenticated()) //Verificar si el usuario ha iniciado sesi�n.
        return next();
    
    res.send({error : ("not logged in")}); //Usuarios no identificados a la p�gina de inicio.
}

//Funciones auxiliares
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
    return string += " " + campo + "=" +'\"'+ valor + '\"';
};
function isBody(data){
    for(var i=0; i< data.length; i++){
        if(data[i][1]) return true;
    }
    return false;
};