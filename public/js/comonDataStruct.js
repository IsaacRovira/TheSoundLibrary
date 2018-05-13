//dataStruct.js

var PATH = "./img/Caratulas/";
var dataSong;
var dataAlbum;

function datosCanciones(callback){
    var datos = '';
    return{
        getDatos  : function() {return datos;},
        setDatos  : function(dato) {
            datos = dato;
            callback(datos);
        }
    };
};
var datosCancionesListener = datosCanciones(function(datos){
    updateDataSongs(datos);
});

function datosDiscos(callback){
    var datos = '';
    return{
        getDatos  : function(){return datos;},
        setDatos  : function(dato){
            datos = dato;
            callback(datos);
        }        
    };
};
var datosDiscosListener = datosDiscos(function(datos){
    updateDataAlbums(datos);
});

//Funciones que actualizan las variables con los datos.
function updateDataSongs(newData){
    dataSong = JSON.parse(newData);
    alert('songs updated');
};
function updateDataAlbums(newData){
    dataAlbum = JSON.parse(newData);
    alert('albums updated');
};



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