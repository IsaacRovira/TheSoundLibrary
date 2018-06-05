//api_routes.js

var config  = require(process.cwd() + '/config/config.js');
var path    = require(config.modulos + 'path');
var mysql   = require(config.modulos + 'mysql');
var sql     = require(path.normalize(config.raiz + "/config/database.js"));
var aux     = require(path.normalize(config.raiz + '/app/misc/misc.js'));

//var express = require(config.modulos + 'express');
//var wd        = config.raiz;
//var parser    = require('http-string-parser');

//var api_router = express.Router();
module.exports = function(api_router){
    api_router.get('api/canciones', function (req, res) {
        logCtrl(req, 'Api Canciones request from');

        var datos = setParamsAsObj(getParamsFromUrl(req.url));
        var string = buildSqlValues(datos);
        var qry = sql.canciones.all + string;

        userCheck(qry, res, datos['userid'], queryDb);
    });

    api_router.get('api/discos', function (req, res) {
        logCtrl(req, 'Api Discos request from');

        var datos = setParamsAsObj(getParamsFromUrl(req.url));
        var string = buildSqlValues(datos);
        var qry = sql.discos.all + string;

        userCheck(qry, res, datos['userid'], queryDb);
    });
};

//Funciones AUXILIARES
//Consulta a la base de datos.
function queryDb(err, qry, callback) {
    if (err) {
        return error(err, callback);
    }
    sql.connect().query(qry, function (err, result) {
        if (err) {
            return error({code: [500], errorRes: ["Ups! Algo ha fallado al intentar conectar con la BD."], errorLog: ["Error (api_router>>discos): " + err]}, callback);
        }
        callback.status(200);
        callback.json(result);
    });
}
;
//Verifica q el usuario existe antes de llamar a la consulta solicitada.
function userCheck(qry, res, user, callback) {
    if (!user) {
        return callback({code: [401], errorRes: ["Falta ID de usuario."], errorLog: ["Error (api_router>>canciones). User = " + user]}, qry, res);
    }
    ;
    //sql.connect().query(sql.users.by_id_key, user, function (err, result) {
    sql.connect().query(sql.users.by_id_key, user, function(err, result){ 
        if (err) {
            return callback({errorRes: ['Vaya, no conseguimos conectar con la BD'], code: [500], errorLog: ["Error (userCheck): " + err]}, qry, res);
        }
        for (var key in result) {
            console.log(result[key].ID_key + "\n" + user);
        }
        ;
        if (result.length > 0) {
            console.log("\tRequest by user: " + result[0]['Email']);
            return callback(null, qry, res);
        }
        else {
            return callback({errorRes: ['Ususario desconocido'], code: [401], errorLog: ['Error (api_router>canciones). Unknown user: ' + user]}, qry, res);
        }
    });
}
;
//Busca userid entre los parámetros de la url. Devuelve null o la id de usuario.
function getUserIdFromUrl(req) {
    console.log(req.url);
    var data = setParamsAsObj(getParamsFromUrl(req.url));
    for (var key in data) {
        if (key == 'userid') {
            userid = mysql.escape(data[key]);
            return data[key];
        }
    }
    return null;
}
;
//Devuelve la cadena de parámetros de la url.
function getParamsFromUrl(url) {

    var params = '';
    for (var i = 0; i < url.length; i++) {
        if (url[i] == '?') {
            params = url.substring(i + 1);
            break;
        }
    }
    return params;
}
;//Pueden los param de la url contener un simbolo de interrogación("?")?
//Dada una cadena de la forma param1=valor1&param2=valor2&paramN=valorN devuelve un object con los parámetros de la cadena.
function setParamsAsObj(string) {
    var obj = {};
    paramArray = string.split('&');
    for (var i = 0; i < paramArray.length; i++) {
        var value = paramArray[i].split('=');
        obj[value[0]] = mysql.escape(value[1]);
    }
    return obj;
}
;
function buildLimit(datos) {
    var string;
    if (datos['max'])
        string = " limit " + datos['max'];
    if (string)
        return string;
    return "";
}
function logCtrl(req, titulo) {
    console.log(aux.ahora() + ' \x1b[36m' + titulo + " " + req['ip'].split(':')[3] + '\x1b[0m');
    for (var key in req) {
        var text;
        switch (key) {
            case 'body':
                for (var n in req[key]) {
                    console.log("\n" + key + ": " + n + ": " + req[key][n]);
                }
                ;
                break;
            case 'sessionID':
                console.log("\n" + key + ": " + req[key] + "\n");
                break;
            case 'session':
                console.log("\n" + key + ": " + req[key].passport.user + "\n");
                break;
            default:
                text += key + " || ";
                break;
        }
    }
    //console.log(text);
}
;
//Serializa los datos del body o url para poder pasarselos al SQL en un where.
function buildSqlValues(datos) {
    var string;
    for (var key in datos) {
        switch (key) {
            case 'userid':
            case 'max':
            case 'orderby':
                //if(datos[key])orderby = ' order by ' + datos[key];
                break;
            default:
                if (datos[key]) {
                    string = updateStringLike(datos[key], string, key);
                }
        }
    }
    ;
    if (string) {
        return 'where ' + string;
    }
    return '';
}
;
//Si exite el dato para orderby devuelve el valor del par�metro pecedido de " order by", si no devuelve una cadena vacia..
function orderBy(dato) {
    if (dato) {
        return ' order by ' + dato;
    }
    else {
        return '';
    }
}
;
function updateStringLike(valor, string, campo) {
    if (string) {
        string += " and ";
        return string += campo + " like " + mysql.escape("%" + valor + "%");
    }
    return campo + " like " + mysql.escape("%" + valor + "%");
}
;
function updateStringEqual(valor, string, campo) {
    if (string) {
        string += " and ";
        return string += campo + " = " + mysql.escape(valor);
    }
    return campo + " = " + mysql.escape(valor);
}
;
function getBodyData(datos, req) {
    var data = datos;
    for (var key in data) {
        switch (key) {
            case 'userid':
                //if(req.session.passport.user) data[key]=mysql.escape(req.session.passport.user);
                break;
            default:
                if (req.body[key]) {
                    data[key] = req.body[key];
                }
                ;
        }
    }

    return data;
}
;
function dataSet() {
    var data = {
        discos: {
            discoId: "",
            album: "",
            artista: "",
            year: "",
            sello: "",
            discografica: "",
            etiquetado: "",
            genero: "",
            identificadores: "",
            tipo: "",
            userid: "",
            max: "",
            orderby: ""
        },
        canciones: {
            artistas: "",
            cancionId: "",
            discoId: "",
            duracion: "",
            pista: "",
            titulo: "",
            userid: "",
            max: "",
            orderby: ""
        }
    };
    return data;
}
;
//Envia los mensajes de error a la consola y como respuesta.
function error(err, res) {
//console.log("\n"+"\x1b[31m"+ mensaje+"\x1b[0m"+"\n");
    console.log("\n" + aux.ahora() + " \x1b[31m" + err.errorLog + "\x1b[0m" + "\n");
    res.status(err.code);
    return res.json(err.errorRes);
}
;