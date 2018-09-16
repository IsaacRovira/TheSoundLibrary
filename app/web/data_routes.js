//data_routes.js

var config = require(process.cwd() + '/config/config.js');
var path = require(config.modulos + 'path');
var mysql = require(config.modulos + 'mysql');
var sql = require(path.normalize(config.raiz + "/config/database.js"));
var aux = require(path.normalize(config.raiz + '/app/misc/misc.js'));


module.exports = function (data_router) {
    //Canciones por fonoteca
    data_router.post('/fonotecas/canciones', isLoggedIn, function (req, res) {
        
        logCtrl(req, "Request fonotecas/canciones.");
        
        var datos   = getBodyData(dataSet().canciones, req);
        var string  = buildSqlValues(datos,true);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.fonotecasdata.canciones + string + limit + orderby;
        
        //userCheck(query, res, datos.userid, queryDb);
        queryDb(null, query, res, datos.userid);
    });

    //Discos por fonoteca
    data_router.post('/fonotecas/discos', isLoggedIn, function (req, res) {        
        
        logCtrl(req, "Request fonotecas/discos.");
        
        var datos   = getBodyData(dataSet().discos, req);
        var string  = buildSqlValues(datos,true);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.fonotecasdata.discos + string + limit + orderby;
        
        //var query   = sql.discos[qry(string)] + string + limit + orderby;

        //userCheck(query, res, datos.userid, queryDb);
        queryDb(null, query, res, datos.userid);
    });

    //Canciones
    data_router.post('/canciones', isLoggedIn, function (req, res) {
        logCtrl(req, "Request Canciones.");
        
        var datos   = getBodyData(dataSet().canciones, req);
        var string  = buildSqlValues(datos);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.canciones.all + string + limit + orderby;

        //userCheck(query, res, datos.userid, queryDb);
        queryDb(null, query, res);

    });//Fin data_router.post Canciones

    // Discos
    data_router.post('/discos', isLoggedIn, function (req, res) {
        logCtrl(req, "*Request Discos.");
        //Encabezado        

        var datos   = getBodyData(dataSet().discos, req);
        var string  = buildSqlValues(datos,true);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.discosNew + string + limit + orderby;

        //userCheck(query, res, datos.userid, queryDb);
        queryDb(null, query, res, datos.userid);
    });
};

//FUNCIONES AUX
function qry(string){
    if (string.length > 0){
        return 'by_Any';
    }
    return 'all';
};

function queryDb(err, qry, callback) {
    if (err) {
        return error(err, callback);
    }
    
    //console.log(qry);
    if(arguments.length>3){
        var user = arguments[3];      
    }else{
        user = null;
    }
    sql[config.dbmode].query(qry, user, function (err, result) {
        if (err) {
            return error({code: [500], errorRes: ["Ups! Algo ha fallado al intentar conectar con la BD."], errorLog: ["Error (data_router): " + err]}, callback);
        }
        callback.setHeader('Content-Type', 'application/json');
        callback.status(201);
        //console.log(JSON.stringify(result));
        callback.send(result);
    });
}
;
//Verifica q el usuario existe antes de llamar a la consulta solicitada.
function userCheck(qry, res, user, callback) {
    if (!user) {
        return callback({code: [401], errorRes: ["Falta ID de usuario."], errorLog: ["Error (data_router). User = " + user]}, qry, res);
    }
    ;
    sql[config.dbmode].query(sql.users.by_id_key, user, function (err, result) {
        if (err) {
            return callback({errorRes: ['Vaya, no conseguimos conectar con la BD'], code: [500], errorLog: ["Error (userCheck): " + err]}, qry, res);
        }
        ;
        /*
        for (var key in result) {
            console.log("1 - " + result[key].ID_key + "\n2 - " + user + "\n3 - " + mysql.escape(user));
        }
        ;
        */
        if (result.length > 0) {
            console.log("\tRequest by user: " + result[0]['Email']);
            return callback(null, qry, res);
        }
        else {
            return callback({errorRes: ['Ususario desconocido'], code: [401], errorLog: ['Error (data_router). Unknown user: ' + user]}, qry, res);
        }
    });
}
;
//Verifica q el usuario existe antes de llamar a la consulta solicitada.
function usrCheck(user, callback) {
    var data = null;
    sql[config.dbmode].query(sql.users.by_id_key, user, function (err, result) {
        if (err) {
            console.error("@Error query usuarios: " + err);
            data = {error: ['Error conectando a la BD'], code: [500]};
        }

        if (result.length > 0) {
            console.log(user + "\n" + result[0].ID_key);
            console.log("\nRequest by user: " + result[0]['Email'] + '\n');
            data = null;
        }
        else {

            console.log("\nUsuario desconocido.");
            data = {error: ['Usuario desconocido'], usuario: [user], code: [401]};
        }
        return callback(data);
    });
}
;
//Genera una cadena con la clausala SQL limit para el query.
function buildLimit(datos) {
    var string;
    if (datos['max'])
        string = " limit " + datos['max'];
    if (string)
        return string;
    return "";
}
;
//Muestra en consola un registro con los datos del request.
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
//Serializa los datos del body para poder pasarselos al SQL.
function buildSqlValues(datos) {
    var string;
    for (var key in datos) {
        switch (key) {
            case 'userid':
            case 'max':                
            case 'orderby':
                //if(datos[key])orderby = ' order by ' + datos[key];
                break;
            case 'discoId':
                if(datos[key]){                    
                    string = updateStringEqual(datos[key], string, key);
                }                
                break;
            default:
                if (datos[key]) {
                    string = updateStringLike(datos[key], string, key);
                }
        }
    }
    ;
    if (string && arguments.length<2) {
        return ' where ' + string;
    }
    if(string && arguments[1]){
        return ' and ' + string;
    }
    return '';
}
;
//Si el exite dato para order by devuelve el valor del par�metro pecedido de " order by", si no devuelve una cadena vacia..
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
        return string += campo + " = " + valor;
    }
    return campo + " = " + valor;
}
;
function getBodyData(datos, req) {
    var data = datos;
    for (var key in data) {
        switch (key) {
            case 'userid':                
                if (req.session.passport.user)
                    data[key] = req.session.passport.user;
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
//Devuelve un objeto vacio para almacenar los datos del request que es capaz de aceptar nuestra app. Los demas los ingnoramos.
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
// isLoggedIn verifica que el usuario haya iniciado sesi�n.
function isLoggedIn(req, res, error, next) {
    //Verificar si el usuario ha iniciado sesión.
    if (req.isAuthenticated()) {
        return next();
    }
    //Usuarios no identificados a la p�gina de inicio.
    return error({errorRes: ["Not logged in."], errorLog: ['Not logged in.'], code: [500]}, res);
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