//data_routes.js

var config          = require(process.cwd()+'/config/config.js');
var path            = require(config.modulos + 'path');
var mysql           = require(config.modulos + 'mysql');
var sql             = require(path.normalize(config.raiz + "/config/database.js"));



module.exports = function(data_router) {

    //Funciones para el control de errores---PENDIENTE---
    var error = function(){};
    
    //***************
    //POST request
    //***************
    //Canciones por fonoteca
    data_router.post('/fonotecas/canciones', isLoggedIn, function(req, res){
        console.log("Request fonotecas/canciones");

        //Encabezado
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        var datos= getBodyData(dataSet().canciones, req.body);
        var string = buildSqlValues(datos);
        var limit = buildLimit(datos);        

        function qryData(err){        
            if(err){            
                console.error("\nUuups! error a la vista: ", err, "\n");
                return res.status(err.code).json(err).end();
            }

            if(string.length > 0) string =" and " + string;
            console.log("\n"+sql.fonotecas.canciones + string + limit + "\n");
            con.query(sql.fonotecas.canciones + string + limit, datos['userid'], function(err, result){
                if(err){
                    console.error("Error query discos: " + err +"\n");                    
                    return res.status(500).json({error: ['Error conectando a la DB'], code: [500]}).end();
                }
                if(JSON.stringify(result).length < 3) return res.status(404).json({errors: ['Sin resultados'], code:[404]}).end();
                return res.status(201).json(result).end();
            });
        };
        if(datos.userid){ return usrCheck(datos.userid,qryData);}

        return res.status(401).json({error: ['Usuario desconocido'], usuario: [datos.userid], code: [401]}).end();
    });

    //Discos por fonoteca
    data_router.post('/fonotecas/discos', isLoggedIn, function(req, res){    
        console.log("Request fonotecas/discos");

        //Encabezado
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        var datos= getBodyData(dataSet().discos, req.body);
        var string = buildSqlValues(datos);
        var limit = buildLimit(datos);        

        function qryData(err){        
            if(err){            
                console.error("\nUuups! error a la vista: ", err, "\n");
                return res.status(err.code).json(err).end();
            }

            if(string.length > 0) string =" and " + string;        
            console.log("\n"+sql.fonotecas.discos + string + limit + "\n");        
            sql.connect().query(sql.fonotecas.discos + mysql.escape(datos['userid']) +" "+string + limit, function(err, result){
                if(err){
                    console.error("Error query discos: " + err +"\n");                    
                    return res.status(500).json({error: ['Error conectando a la DB'], code: [500]}).end();
                }
                if(JSON.stringify(result).length < 3) return res.status(404).json({errors: ['Sin resultados'], code:[404]}).end();
                return res.status(201).json(result).end();
            });
        };
        if(datos.userid){ return usrCheck(datos.userid,qryData);}

        return res.status(401).json({error: ['Usuario desconocido'], usuario: [datos.userid], code: [401]}).end();
    });

    //Canciones
    data_router.post('/canciones', isLoggedIn, function(req, res){    
        logCtrl(req,"Request Canciones.");

        //Encabezado
        res.set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        var datos= getBodyData(dataSet().canciones, req);
        var string = buildSqlValues(datos);
        var limit = buildLimit(datos);

        function qryData(err){        
            if(err){            
                console.error("\nUuups! error a la vista: ", err, "\n");
                return res.status(err.code).json(err).end();
            }
            var qry = 'all';
            if(string.length > 0) qry='by_Any';

            console.log("\n"+sql.canciones[qry] + string + limit + "\n");
            sql.connect().query(sql.canciones[qry] + string + limit, function(err, result){                                
                if(err){
                    console.error("Error query canciones: " + err +"\n");                    
                    return res.status(500).json({error: ['Error conectando a la DB'], code: [500]}).end();
                }
                if(JSON.stringify(result).length < 3) return res.status(404).json({errors: ['Sin resultados']}).end();
                return res.status(201).json(result).end();
            });
        };

        if(datos.userid){ return usrCheck(datos.userid,qryData);}
        return res.status(401).json({error: ['Usuario desconocido'], usuario: [datos.userid], code: [401]}).end();
    });//Fin data_router.post Canciones

    // Discos
    data_router.post('/discos', isLoggedIn, function(req, res){
        logCtrl(req, "Request Discos.");
        //Encabezado
        //res.set({'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'});

        var datos       =getBodyData(dataSet().discos, req);
        var string      =buildSqlValues(datos);
        var limit       =buildLimit(datos);
        var orderby     =orderBy(datos.orderby);
        //if(req.session.passport.user){datos.userid=mysql.escape(req.session.passport.user);};

        function qryData(err){        
            if(err){            
                console.error("\nUuups! error a la vista: ", err, "\n");
                return res.status(err.code).json(err).end();
            }
            var qry = 'by_Any';
//            if(string.length > 0) qry='by_Any';

            console.log("\n"+sql.discos[qry] + string + limit + orderby + "\n");
            sql.connect().query(sql.discos[qry], string + limit + orderby, function(err, result){
                if(err){
                    console.error("Error query discos: " + err +"\n");                    
                    return res.status(500).json({error: ['Error conectando a la DB'], code: [500]}).end();
                }
                if(JSON.stringify(result).length < 3) return res.status(404).json({errors: ['Sin resultados'], code:[404]}).end();
                return res.status(201).json(result).end();
            });
        };

        if(datos.userid){ return usrCheck(datos.userid,qryData);}
        console.error(JSON.stringify({error: ['Usuario desconocido'], usuario: [datos.userid], code: [401]})+"\n");
        return res.status(401).json({error: ['Usuario desconocido'], usuario: [datos.userid], code: [401]}).end();
    });
};

//FUNCIONES AUX
function usrCheck(user, callback){
    var data = null;
    sql.connect().query(sql.users.by_id_key + user, function(err, result){
        if(err){
            console.error("@Error query usuarios: " + err);
            data = {error: ['Error conectando a la BD'], code: [500]};
        }            
        if(result.length > 0){
            console.log("\nRequest by user: " +result[0]['Email']+'\n');
            data = null;
        }else{
            console.log("\nUsuario desconocido.");
            data ={error: ['Usuario desconocido'], usuario: [user], code: [401]};
        }
        return callback(data);
    });
};
function buildLimit(datos){
    var string;
    if(datos['max']) string= " limit " + datos['max'];    
    if(string)return string;
    return "";
}
function logCtrl(req, titulo){
    console.log(titulo + "\n");
    for(var key in req){
        var text;        
        switch(key){            
            case 'body':
                for(var n in req[key]){console.log("\n" + key + ": "+ n + ": " + req[key][n]);};
                 break;
            case 'sessionID': console.log("\n" + key + ": "+ req[key] + "\n");break;
            case 'session': console.log("\n" + key + ": "+ req[key].passport.user + "\n");break;
            default: text+=key+" || ";break;
        }        
    }
   //console.log(text);
};
//Serializa los datos del body para poder pasarselos al SQL.
function buildSqlValues(datos){    
    var string;
    for(var key in datos){
        switch(key){
            case 'userid':
            case 'max':
                break;
            case 'orderby':
                //if(datos[key])orderby = ' order by ' + datos[key];
                break;                
            default:
                if(datos[key]){string = updateStringLike(datos[key], string, key);}
        }
    };
    if(string){return 'where ' + string;}    
    return '';
};
//Si el exite dato para order by devuelve el valor del parámetro pecedido de " order by", si no devuelve una cadena vacia..
function orderBy(dato){
    if(dato){
        return ' order by ' + dato;
    }else{
        return '';
    }    
};
function updateStringLike(valor, string, campo){
    if(string){
        string += " and ";
        return string += campo + " like " + mysql.escape("%"+valor+"%");        
    }
    return campo + " like " + mysql.escape("%"+valor+"%");
};
function updateStringEqual(valor, string, campo){
    if(string){
            string += " and ";
            return string += campo + " = " + mysql.escape(valor);
    }
    return campo + " = " + mysql.escape(valor);    
};
function getBodyData(datos, req){
    var data;
    for(var key in datos){        
        switch(key){
            case 'userid':                
                if(req.session.passport.user) data[key]=mysql.escape(req.session.passport.user);
                break;
            default:
                if(req.body[key]){data[key]=req.body[key];};
        }
    }
    
    return data;
};
function dataSet(){
    var data={
        discos  :{
            discoId           :"",
            album             :"",
            artista           :"",
            year              :"",
            sello             :"",
            discografica      :"",
            etiquetado        :"",
            genero            :"",
            identificadores   :"",
            tipo              :"",
            userid            :"",
            max               :"",
            orderby           :""
        },
        canciones   :{
            artistas            :"",
            cancionId           :"",
            discoId             :"",
            duracion            :"",
            pista               :"",
            titulo              :"",
            userid              :"",
            max                 :"",            
            orderby             :""
        }
    };
    return data;
};

// isLoggedIn verifica que el usuario haya iniciado sesión.
function isLoggedIn(req, res, next) {    
    if (req.isAuthenticated()) //Verificar si el usuario ha iniciado sesión.
        return next();
    
    res.send({error : ("not logged in")}); //Usuarios no identificados a la página de inicio.
}