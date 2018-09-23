//queryALL.js

var userID = commonData.userID.get();
var serverName = commonData.server.get();
var apiPort = commonData.apiPort.get();

var fonoData;
var updateTime = 30000;

//queryString = nombre1=valor1&nombre2=valor2
function doQuery(queryString, destino, callback) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(queryString + "&" + userID);
}
;
//Query all the data
function doQueryAll(destino, callback) {    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}
;
//Envía un post los parámetros insertados en "conditionOBJ", el valor limite y el orderby.
//Para el filtro y la búsqueda.
function doQuerySearch(destino, conditionsObj, limitINT, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            callback(this.responseText);
        }
    };

    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(buildSearchString(conditionsObj, limitINT));
}
;
function doQuerySearch(destino, conditionsObj, callback) {    
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {            
            callback(this.responseText);
        }
    };

    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xhttp.send(buildSearchString(conditionsObj));
}
;
function doQuerySearch(destino, conditionsObj, limitINT, orderby, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            callback(this.responseText);
        }
    }
    ;
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xhttp.send(buildSearchString(conditionsObj, limitINT, orderby));
}
;
function doQuerySongsByAlbumId(destino, albumId, callback) {    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {        
        if (this.readyState === 4 && this.status === 201) {            
            callback(albumId, JSON.parse(this.responseText));
        }
    }
    ;
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send('discoID=' + albumId);
}
;

//DICOG QUERY METODO 2
//Pasa el string completo al servidor de la forma (https://api.discogs.com/database/search?label=Universal+Records&year=1977&genre=Rock&per_page=3&type=release&page=2)
//y el servidor completa el header, hace la consulta y devuelve el objecto con la respuesta.
function doQueryDiscogsAlbum2(destino, qry, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            callback (JSON.parse(this.responseText));
        }
    }
    ;
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("qry="+qry);
}
;
//DISCOG QUERY METODO 1
//Pasa el string de busqueda y el de paginación al servidor para hacer el query a DISCOG
// y el servidor genera el URL, y el header, hace la consulta y devuevle el objeto con la resupesta.
function doQueryDiscogsAlbums(destino, searchData, paginationSettings, callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            callback (JSON.parse(this.responseText));
        }
    }
    ;
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(buildDiscogString(searchData,paginationSettings));
}
;
//Serializa el objeto dataObject de tipo clave=valor y añade el valor maxInt al final.
function buildSearchString(dataObject, maxInt, ordby){
    var string='';    
    var max = maxInt || 0;
    var ord = ordby || '';
    
    for(var key in dataObject){
        if(dataObject[key]) string+= key + "=" + dataObject[key] + "&";
    }        
    return string+="limit=" + max + "&orderby=" + ord;
}
;
//serializa el objeto searchy y pagination para psarselo a la función xhttp.send
function buildDiscogString(search, pagination){
    var string = serializeObject('',search);
    string = serializeObject(string,pagination);
    return string;
}
;
//Devuelve un objecto como una cadena del tipo clave1=valor1&clave2=valor2&claveN=valorN
function serializeObject(string, object){
    for(var key in object){
        if(string.length === 0){
            string=key +"="+object[key];
        }
        string+="&"+key+"="+object[key];
    }
    return string;
}
;
//To test. No usada.
var getAll = function (callback) {
    var url = "http://127.0.0.1:3030/api/discos";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            //alert(this.responseText);            
            callback(this.responseText);
        }
    };

    xhttp.open("POST", url, true);
    xhttp.send();
}
;
//No lo voy a usar. OrderBy como un objeto q admite varios criterios de ordenación.
function getOrderByString(orderObjct){
    var string = '';
    for(var key in orderObjct){
        switch(orderObjct[key]){
            case 0:
                if(string > 0) string += ", ";
                string += key + " asc";
                break;
            case 1:
                if(string > 0) string += ", ";
                string += key + " desc";
                break;
            default:
                if(string > 0) string += ", ";
                string += key;
        }
    }    
    return string;
}
;