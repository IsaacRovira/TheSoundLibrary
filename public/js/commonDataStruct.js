/* global localstorage */

//  ./public/js/commonDataStruct.js
var PATH = {
    cover: "./img/Caratulas/",
    backcover: "./img/backcover/"
};
var dataSong;
var dataAlbum;
var songsUpdate = true;
var albumsUpdate = false;
var serverName = getServer();
var userID = getuserID();
var apiPortValue = 3030;
var urlSettings = {
    std: {
        general: {
            discos: "http://" + getServer() + "/discos",
            canciones: "http://" + getServer() + "/canciones"
        },
        fonotecas: {
            discos: "http://" + getServer() + "/fonotecas/discos",
            canciones: "http://" + getServer() + "/fonotecas/canciones"
        },
        discog: {
            discos: "http://" + getServer() + "/add/discos",
            canciones: ""
        }
    },
    api: {
        general: {
            'discos': "http://" + getServer() + apiPortValue + "/api/discos",
            'canciones': "http://" + getServer() + apiPortValue + "/api/canciones"
        },
        fonotecas: {
            'discos': "http://" + getServer() + apiPortValue + "/api/fonotecas/discos",
            'canciones': "http://" + getServer() + apiPortValue + "/api/fonotecas/canciones"
        }
    }
};
var esMosaico = true;
var idActivo = '';
var activeId; //Id de album con detalles activos.
var isActive = false; //
var activeDiv;
var orderByField = "discoID";
var dataToSearch={};
var currentMode = 'Fonoteca'; //fonotecas, Añadir
var currentPage = 1;
var numItemsPerPage = 9; //Almacenar en base de datos por usuario o en una cookie
var releaseType = "release"; //Master-Release //Almacenar en base de datos por usuario o en una cookie

var datosDiscogAlbums = null;
var datosDiscogCanciones = null;




commonData = {
    path:               pathClass(function () {
        return null;
    }),
    server:             serverClass(function () {
        return null;
    }),
    userID:             userIDClass(function () {
        return null;
    }),
    apiPort:            apiPortClass(function () {
        return null;
    }),
    songsUpdateStatus:  songsUpdateStatusClass(function () {
        return null;
    }),
    albumsUpdateStatus: albumsUpdateStatusClass(function () {
        return null;
    }),
    datosCanciones:     datosCancionesClass(function (datos) {
        updateDataSongs(datos);
    }),
    datosDiscos:        datosDiscosClass(function (datos) {        
        updateDataAlbums(datos);
    }),
    url:                urlClass(function () {
        return null;
    }),
    esMosaico:          esMosaicoClass(function(){
        return null;
    }),
    idActivo:           idActivoClass(function(){
        return null;
    }),
    activeId:           activeIdClass(function(){
        return null;
    }),
    isActive:           isActiveClass(function(){
        return null;
    }),
    activeDiv:          activeDivClass(function(){
        return null;
    }),
    orderByField:       orderByFieldClass(function(){
        return null;
    }),
    dataToSearch:       dataToSearchClass(function(){
        return null;
    }),
    currentMode:        currentModeClass(function(){
        return null;
    }),
    datosDiscogAlbums:  datosDiscogAlbumsClass(function(data){
        return updateAddView(data);
    }),
    datosDiscogCanciones: datosDiscogCancionesClass(function(){
        return null;
    })
};
//***************************************************************

function datosDiscogCancionesClass(callback){
    return{
        get: function(){
            return datosDiscogCanciones;
        },
        set: function(dato){
            datosDiscogCanciones = dato;
            callback(datosDiscogcanciones);
        }
    };
}
;
function datosDiscogAlbumsClass(callback){
    return{
        get: function(){
            return datosDiscogAlbums;
        },
        set: function(dato){
            datosDiscogAlbums = dato;
            callback(dato);
        }
    };
}
;
function currentPageClass(callback){
    return{
        get: function(){
            return currentPage;
        },
        set: function (dato){
            currentPage = dato;
            callback(currentPage);
        }
    };
}
;
function numItemsPerPageClass(callback){
    return{
        get: function(){
            return numItemsPerPage;
        },
        set function(dato){
            numItemPerPage = dato;
            callback(numItemPerPage);
        }
    };
}
;
function releaseTypeClass(callback){
    return{
        get: function(){
            return releaseType;
        },
        set: function(dato){
            releaseType = dato;
            callback(releaseType);
        }
    };
}
;
function pathClass(callback) {
    return{
        get: function () {
            return PATH;
        },
        set: function (newData) {
            PATH = newData;
            callback(PATH);
        }
    };
}
;
function serverClass(callback) {
    return{
        get: function () {
            return serverName;
        },
        set: function (newData) {
            serverName = newData;
            callback(serverName);
        }
    };
}
;
function userIDClass(callback) {
    return{
        get: function () {
            return userID;
        },
        set: function (newData) {
            userID = newData;
            callback(userID);
        }
    };
}
;
function apiPortClass(callback) {
    return{
        get: function () {
            return apiPortValue;
        },
        set: function (newData) {
            apiPort = newData;
            callback(apiPortValue);
        }
    };
}
;
function songsUpdateStatusClass(callback) {
    return{
        get: function () {
            return songsUpdate;
        },
        set: function (newData) {
            songsUpdate = newData;
            callback(songsUpdate);
        }
    };
}
;
function albumsUpdateStatusClass(callback) {
    return{
        get: function () {
            return albumUpdate;
        },
        set: function (newData) {
            albumUpdate = newData;
            callback(albumUpdate);
        }
    };
}
;
function datosCancionesClass(callback) {
    return{
        get: function () {
            return dataSong;
        },
        set: function (dato) {
            dataSong = JSON.parse(dato);
            callback(JSON.parse(dato));
        }
    };
}
;
function datosDiscosClass(callback) {
    return{
        get: function () {
            return dataAlbum;
        },
        set: function (dato) {            
            //dataAlbum = JSON.parse(dato);
            dataAlbum = dato;
            callback(dato);
        }
    };
}
;
function urlClass(callback) {
    return{
        get: function () {
            return urlSettings;
        },
        set: function (newData) {
            urlSettings = newData;
            callback(urlSettings);
        }
    };
}
;
function esMosaicoClass(callback){
    return{
        get: function (){
            return esMosaico;
        },
        set: function(newData){
            esMosaico = newData;
            callback(newData);
        }
    };
}
;
function idActivoClass(callback){
    return{
        get: function(){
            return idActivo;
        },
        set: function(newData){
            idActivo = newData;
            callback(newData);
        }
    };    
}
;
function activeIdClass(callback){
    return{
        get: function(){
            return activeId;            
        },
        set: function(newData){
            activeId=newData;
            callback(newData);
        }
    };
}
;
function isActiveClass(callback){
    return{
        get: function(){
            return isActive;
        },
        set: function(newData){
            isActive = newData;
            callback(newData);
        }
    };
}
;
function activeDivClass(callback){
    return{
        get: function(){
            return activeDiv;
        },
        set: function(newData){
            activeDiv = newData;
            callback(newData);
        }
    };
}
;
function orderByFieldClass(callback){
    return{
        get: function(){
            return orderByField;
        },
        set: function(newData){
            orderByField = newData;
            callback(newData);
        }
    };
}
;
function dataToSearchClass(callback){
    return{
        get:    function(){
            return dataToSearch;
        },
        set:    function(newData){
            dataToSearch=newData;
            callback(newData);
        }
    };
}
;
function currentModeClass(callback){
    return{
        get:    function(){
            return currentMode;
        },
        set:    function(newData){
            currentMode = newData;
            callback(newData);
        }
    };
}
;

//**************************************************************
//Funciones que actualizan las variables con los datos.
function updateDataSongs() {
    commonData.songsUpdateStatus.set(true);
    console.log("canciones: ",commonData.datosCanciones.get());
}
;
function updateDataAlbums(newData) {
    commonData.albumsUpdateStatus.set(true); //Actualizamos el estado del estado de albumsUpdata
    commonData.activeId.set(null);          //Pasamos el valor null a la variable que almacena la id del album que muestra los detalles.
    commonData.isActive.set(false);         //Asignamos false a la variable que indica que hay un album q muestra los detalles.
    removeElements();
    //console.log("albumData: ",commonData.datosDiscos.get());
    if(esMosaico){
        genImageMosaico(commonData.datosDiscos.get());
    }else{
        genImageList(commonData.datosDiscos.get());        
    }       
}
;
function getServer() {
    return self.location.hostname;
//self.location.host
//self.location.hostname
}
;
//Dejo aquí el userID o lo passo como parámetro a la función export?
function getuserID() {
    //console.log(JSON.stringify(document.cookie));
    userID = JSON.stringify(document.cookie);
    return userID;
}
;
function load(){    
    //changeMode(JSON.parse(data));
    //doQueryAll(urlSettings.std.fonotecas.canciones, commonData.datosCanciones.set);
    doQueryAll(commonData.url.get().std.fonotecas.discos, commonData.datosDiscos.set);    
    //doQueryAll(urlSettings.std.general.canciones, commonData.datosCanciones.set);
    //doQueryAll(urlSettings.std.general.discos, commonData.datosDiscos.set);
}
;

/*
 var datosDiscos = {
 datosStored   : '',
 datosListener   :   function (newData){},
 set datos(newData){
 this.datosStored = newData;
 this.datosListener(newData);
 },
 get a(){
 return this.datosStored;
 },
 Listener    :   function(listener){
 this.datosListener  =   listener;        
 }
 };
 
 var datosCanciones = {
 datosStored     : '',
 datosListener   :   function(newData){},
 set datos(newData){
 this.datosStored = newData;
 this.datosListener(newData);        
 },
 get datos(){
 return this.datosStored;
 },
 Listener    :   function(listener){
 this.datosListener = listener;
 }
 };
 
 datosDiscos.Listener(function(datos){
 //Funcion a la que le pasamos el nuevo valor de datosDiscos;
 });
 datosCanciones.Listener(function(datos){
 //Funcion a la que le pasamos el nuveo valor de datosCanciones;
 });
 */