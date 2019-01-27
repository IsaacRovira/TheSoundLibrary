//data_routes.js

var config = require(process.cwd() + '/config/config.js');
var path = require(config.modulos + 'path');
var mysql = require(config.modulos + 'mysql');
var sql = require(path.normalize(config.raiz + "/config/database.js"));
var aux = require(path.normalize(config.raiz + '/app/misc/misc.js'));
var https = require('https');

module.exports = function (data_router) {
    //Discos DISCOG
    data_router.post('/add/discos', isLoggedIn, function (req, res) {
        logCtrl(req, "Request add/discos.");
        
        console.log("No JSON: ", req.body.pagination);
        console.log("JSON: ", req.body.pagination);
        if(req.body.full_url){
            doQuery(req.body.full_url, res);
        }else{
            var url = req.body.host || "api.discogs.com";
            var path = req.body.path;
            var datosSearch = getBodyData(searchParamDiscog, req);
            var datosPagination = getBodyData(paginationDiscog, req);

            doQuery(url, path, datosSearch, datosPagination, header, res);
        }
    })
    ;
    //Canciones por fonoteca
    data_router.post('/fonotecas/canciones', isLoggedIn, function (req, res) {
        
        logCtrl(req, "Request fonotecas/canciones.");
        
        var datos   = getBodyData(dataSet().canciones, req);
        var string  = buildSqlValues(datos,true);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.fonotecasdata.canciones + string + limit + orderby;
        
        //userCheck(query, res, datos.userID, queryDb);
        queryDb(query, datos.userID, res);
    })
    ;
    //Discos por fonoteca
    data_router.post('/fonotecas/discos', isLoggedIn, function (req, res) {        
        logCtrl(req, "Request fonotecas/discos.");
                
        var datos   = getBodyData(dataSet().discos, req);
        var string  = buildSqlValues(datos,true);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.fonotecasdata.discos + string + limit + orderby;
        
        //var query   = sql.discos[qry(string)] + string + limit + orderby;

        //userCheck(query, res, datos.userID, queryDb);
        queryDb(query, datos.userID, res);
    });

    //Canciones
    data_router.post('/canciones', isLoggedIn, function (req, res) {
        logCtrl(req, "Request Canciones.");
        
        var datos   = getBodyData(dataSet().canciones, req);
        var string  = buildSqlValues(datos);
        var limit   = buildLimit(datos);
        var orderby = orderBy(datos.orderby);
        var query   = sql.canciones.all + string + limit + orderby;

        //userCheck(query, res, datos.userID, queryDb);
        console.log(query);
        queryDb(query, [], res);

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

        //userCheck(query, res, datos.userID, queryDb);
        queryDb(query, datos.userID, res);
    });
};

//FUNCIONES AUX
function queryDb(qry, user, callback) {
    //console.log(qry);
    sql[config.dbmode].query(qry, user, function (err, resultado) {
        if (err) {
            error({code: [500], errorRes: ["Ups! Algo ha fallado al intentar conectar con la BD."], errorLog: ["Error (data_router): " + err]}, callback);
        }else{
            callback.setHeader('Content-Type', 'application/json');
            callback.status(201);            
            callback.send(resultado);  
        }        
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
            case 'userID':
            case 'max':                
            case 'orderby':
                //if(datos[key])orderby = ' order by ' + datos[key];
                break;
            case 'discoID':
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
            case 'userID':                
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
            discoID: "",
            album: "",
            artista: "",
            year: "",
            sello: "",
            discografica: "",
            etiquetado: "",
            genero: "",
            identificadores: "",
            tipo: "",
            userID: "",
            max: "",
            orderby: ""
        },
        canciones: {
            artistas: "",
            cancionID: "",
            discoID: "",
            duracion: "",
            pista: "",
            titulo: "",
            userID: "",
            max: "",
            orderby: ""
        }
    };
    return data;
}
;
// isLoggedIn verifica que el usuario haya iniciado sesi�n.
function isLoggedIn(req, res, next) {
    //console.log("Funcion isLoggedIn");
    //Verificar si el usuario ha iniciado sesión.
    if (req.isAuthenticated()) {
        //console.log("isLoggedIn OK");
        return next();
    }
    console.log("isLoggedIn error");
    error(({errorRes: ["Not logged in."], errorLog: ['Not logged in.'], status: [500]}),res);
}
;

//Envia los mensajes de error a la consola y como respuesta.
function error(err, res) {
//console.log("\n"+"\x1b[31m"+ mensaje+"\x1b[0m"+"\n");
    console.log("\n" + aux.ahora() + " \x1b[31m" + err.errorLog + "\x1b[0m" + "\n");
    res.status(err.status);
    res.json(err.errorRes);
}
;

//Query DISCOGS
var URL = "https://api.discogs.com/database/search";
var header ={
    'user-agent': "TheSoundLibrary/1.0 +http://thesoundlibrary.com",
    Authorization: "Discogs token=SdnGXnFwzcWVCMUhDmuumAZJOdCkpCcVGNApmdju"
}
;
function doQueryOLD(destino, header, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            callback (this.responseText);
        }
        if(this.readyState === 4 && this.status > 400){
            console.error(this.status+ "=>" +JSON.parse(this.responseText));
            callback (this.responseText);
        }
    }
    ;
    xhttp.open("GET", destino, true);
    xhttp.setRequestHeader('user-agent'+"="+header['user-agent'], 'Authorization'+"="+header['Authorization']);
    xhttp.send();
}
;
//https://api.discogs.com/database/search?title=back to black&type=release&per_page=3&page=1
function divideURI(uri){
    var protocol    = uri.split('://')[0];
    var host        = uri.split('/')[2];
    var path        = uri.split(host)[1];
    return {protocol: protocol, host: host, path: path};
}
;
//Funciónq realiza la consulta a la base de datos DISCOG
//utilizando el modulo https y su función request.

function doQuery(host, path, search, pagination, header, callback){    
    
    console.log(arguments.length, arguments[0], arguments[2]);
    
    if(arguments.length < 6){
        var opt = host;
    }else{
        var opt = {
            port: 443,
            host: host,
            path: encodeURI(buildDiscogString(path,search, pagination)),
            method: 'GET',
            headers: header
        };
    }
    var datos='';
    var req = https.request(opt, function(res){
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        console.log(res.headers.date," ", res.headers['x-discogs-ratelimit-remaining']);
        res.on('data', function(data){
            datos+=data;
        });
        res.on('err', function(err){
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);            
            console.log(err);
            callback.status(res.statusCode);
            callback.send(err);
        });
        res.on('end', function(){
           console.log("Respuesta recibida.");
           if(res.statusCode > 200){
               console.log(datos);
           }            
           callback.status(res.statusCode);
           callback.send(datos);
        });
    });
    req.end();
}
;
//Estructura que recoge los parámetros para la búsqueda.
var searchParamDiscog={
    barcode:    "",
    format:     "",
    genre:      "",
    label:      "",    
    style:      "",
    title:      "",
    type:       "",
    year:       ""
}
;
//Estructura que recoge los parámetros de paginación.
var paginationDiscog={
    per_page: "",   //Elementos por pagina
    page   : ""     //Pagina consultada.
}
;
//serializa el objeto searchy y pagination para psarselo a la función xhttp.send
function buildDiscogString(path, search, pagination){
    string = path+'\?';
    string += serializeObject(search);
    string +='&';
    string += serializeObject(pagination);
    return string;
}
;
//Acepta un objeto y una cadena y los devuelve
//unidos como una cadena del tipo clave1=valor1&clave2=valor2&claveN=valorN
function serializeObject(object){
    var string='';
    for(var key in object){
        if(string.length === 0){
            string=key +"="+object[key];
        }
        string+="&"+key+"="+object[key];
    }
    return string;
}
;