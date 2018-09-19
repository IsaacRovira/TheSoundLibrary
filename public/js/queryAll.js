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