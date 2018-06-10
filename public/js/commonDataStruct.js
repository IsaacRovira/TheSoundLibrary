//  ./public/js/commonDataStruct.js
var PATH = {
    cover: "./img/Caratulas/",
    backcover: "./img/backcover/"
};
var dataSong;
var dataAlbum;
var songsUpdate = false;
var albumsUpdate = false;
var serverName = getServer();
var userId = getUserId();
var apiPortValue = 3030;
var urlSettings = {
    std: {
        general: {
            'discos': "http://" + getServer() + "/discos",
            'canciones': "http://" + getServer() + "/canciones"
        },
        fonotecas: {
            'discos': "http://" + getServer() + "/fonotecas/discos",
            'canciones': "http://" + getServer() + "/fonotecas/canciones"
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
var orderByField = "discoid";
var dataToSearch={};

//***************************************************************
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
function userIdClass(callback) {
    return{
        get: function () {
            return userId;
        },
        set: function (newData) {
            userId = newData;
            callback(userId);
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
            dataAlbum = JSON.parse(dato);
            callback(JSON.parse(dato));
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
//**************************************************************
var commonData = {
    path:               pathClass(function () {
        return null;
    }),
    server:             serverClass(function () {
        return null;
    }),
    userId:             userIdClass(function () {
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
    })
};

//Funciones que actualizan las variables con los datos.
function updateDataSongs(newData) {
    commonData.songsUpdateStatus.set(true);
}
;
function updateDataAlbums(newData) {    
    commonData.albumsUpdateStatus.set(true);
    removeElements();
    if(esMosaico){
        genImageMosaico(newData);
    }else{
        genImageList(newData);        
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
function getUserId() {
    console.log(JSON.stringify(document.cookie));
    userid = JSON.stringify(document.cookie);
    return userid;
}
;
function load() {
    //changeMode(JSON.parse(data));
    doQueryAll(urlSettings.std.general.canciones, commonData.datosCanciones.set);
    doQueryAll(urlSettings.std.general.discos, commonData.datosDiscos.set);
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