//data_routes.js

var config          = require(process.cwd()+'/config/config.js');
var path            = require(config.modulos + 'path');
var express         = require(config.modulos + 'express');
var mysql           = require(config.modulos + 'mysql');
var sql             = require(path.normalize(config.raiz + "/config/database.js"));



var data_router	= express.Router();

//Funciones para el control de errores---PENDIENTE---
var error = function(){};

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
//POST request
//***************
//Canciones por fonoteca
data_router.post('/fonotecas/canciones', function(req, res){
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
data_router.post('/fonotecas/discos', function(req, res){    
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
        sql.conectar().query(sql.fonotecas.discos + mysql.escape(datos['userid']) +" "+string + limit, function(err, result){
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
data_router.post('/canciones', function(req, res){    
    logCtrl(req,"Request Canciones.");
    
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
        var qry = 'all';
        if(string.length > 0) qry='by_Any';

        console.log("\n"+sql.canciones[qry] + string + limit + "\n");
        sql.conectar().query(sql.canciones[qry] + string + limit, function(err, result){                                
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
data_router.post('/discos', function(req, res){
    logCtrl(req, "Request Discos.");
    
    //Encabezado
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'        
    });
    
    var datos= getBodyData(dataSet().discos, req.body);
    var string = buildSqlValues(datos);
    var limit = buildLimit(datos);
        
    function qryData(err){        
        if(err){            
            console.error("\nUuups! error a la vista: ", err, "\n");
            return res.status(err.code).json(err).end();
        }
        var qry = 'all';
        if(string.length > 0) qry='by_Any';

        console.log("\n"+sql.discos[qry] + string + limit + "\n");
        sql.conectar().query(sql.discos[qry] + string + limit, function(err, result){                                
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

//FUNCIONES AUX
function usrCheck(user, query){
    sql.conectar().query(sql.users.by_id_key + user, function(err,result){
        if(err){
            //console.error("@Error query usuarios: " + err);
            return query({error: ['Error conectando a la BD'], code: [500]});
        }            
        if(result.length > 0){
            //console.log("\nRequest by user: " +result[0]['Email']+'\n');
            return query();
        }
        return query({error: ['Usuario desconocido'], usuario: [user], code: [401]});
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
                for(var n in req[key]){console.log("\n" + key + ": "+ n + ": " + req[key][n])};
                 break;
            case 'sessionID': console.log("\n" + key + ": "+ req[key] + "\n");break;
            default: text+=key+" || ";break;
        }        
    }
   //console.log(text);
};
function buildSqlValues(datos){    
    var string;
    for(var key in datos){
        switch(key){
            case 'userid':
            case 'max':
                //var max;
                //if(datos[key]){max = " limit " + mysql.escape(datos[key])};
                break;
            default:
                if(datos[key]){string = updateStringLike(datos[key], string, key);}
        }
    };
    
    if(string){return string;}    
    return '';
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
function getBodyData(datos, body){
    var datos;
    for(var key in datos){        
        switch(key){
            case 'userid':
                if(body[key]){datos[key]=mysql.escape(body[key])};
                break;
            default:
                if(body[key]){datos[key]=body[key]};
        }
    }
    return datos;
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
            max               :""
        },
        canciones   :{
            artistas            :"",
            cancionId           :"",
            discoId             :"",
            duracion            :"",
            pista               :"",
            titulo              :"",
            userid              :"",
            max                 :""
        }
    };
    return data;
};

module.exports = data_router;


function control(){console.log("\n\n ESTOY AQUI\n\n");};