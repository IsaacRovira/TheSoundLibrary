//dataStruct.js
var PATH    ={
    cover       : "./img/Caratulas/",
    backcover   : "./img/backcover/"
};
var dataSong;
var dataAlbum;
var songsUpdate = false;
var albumsUpdate = false;
var serverName = getServer();
var userId = getUserId();
var apiPortValue = 3030;
var urlSettings ={
    proto   : "http://",
    std :{
        general :{
            'discos'        : "/discos",
            'canciones'     : "/canciones"
        },
        fonotecas   :{
            'discos'    :"/fonotecas/discos",
            'canciones' :"/fonotecas/canciones"
        }        
    },
    api :{
        general :{
            'discos'        : "/api/discos",
            'canciones'     : "/api/canciones"
        },
        fonotecas   :{
            'discos'    :"/api/fonotecas/discos",
            'canciones' :"/api/fonotecas/canciones"
            }
        }
};

    function load(data){
        changeMode(JSON.parse(data));
        doQueryAll(url['std']['general']['canciones'], datosCanciones.set);
        doQueryAll(url['std']['general']['discos'], datosDiscos.set);
    };

module.exports = function(){
    
    function urlClass(callback){
        return{
            get     :   function(modo, origen, tipo){
                return urlSettings.proto+server.get()+urlSettings[modo][origen][tipo];
            },
            set     :   function(modo, origen, tipo, newData){
                urlSettings[modo][origen][tipo] = newData;
                callback(urlSettings[modo][origen][tipo]);
            }
        };
    };
    var url = urlClass(function(dato){return null;});
    
    //***************************************************************
    function pathClass(callback){
        return{
            get     :   function (){return PATH;},
            set     :   function (newData){
                PATH = newData;
                callback(PATH);
            }
        };
    };
    var path = pathClass(function(dato){return null;});
    
    function serverClass(callback){
        return{
            get     :   function(){return serverName;},
            set     :   function(newData){
                serverName  =   newData;
                callback(serverName);
            }
        };
    };
    var server = serverClass(function(dato){return null;});
    
    function userIdClass(callback){
        return{
            get     : function(){return userId;},
            set     : function(newData){
                userId  = newData;
                callback(userId);
            }
        };
    };
    var userId = userIdClass(function(dato){return null;});
    
    function apiPortClass(callback){
        return{
            get     : function(){return apiPortValue;},
            set     : function(newData){
                apiPort = newData;
                callback(apiPortValue);
            }
        };
    };
    var apiPort = apiPortClass(function(dato){return null;});
    
    function songsUpdateStausClass(callback){
        return{
            get     : function(){return songsUpdate;},
            set     : function(newData){
                songsUpdate = newData;
                callback(songsUpdate);
            }
        };
    };
    var songsUpdateStaus = songsUpdateStausClass(function(dato){return null;});
    
    function albumUpdateStatusClass(callback){
        return{
            get     : function(){return albumUpdate;},
            set     : function(newData){
                albumUpdate = newData;
                callback(albumUpdate);
            }
        };
    };
    var albumUpdateStatus = albumUpdateClass(function(dato){return null;});
    
    function datosCancionesClass(callback){
        return{
            get  : function() {return dataSong;},
            set  : function(dato) {
                dataSong = dato;
                callback(dataSong);
            }
        };
    };
    var datosCanciones = datosCancionesClass(function(datos){
        updateDataSongs(datos);
    });

    function datosDiscosClass(callback){        
        return{
            get  : function(){return dataAlbum;},
            set  : function(dato){
                dataAlbum = dato;
                callback(dataAlbum);
            }        
        };
    };
    var datosDiscos = datosDiscosClass(function(datos){
        updateDataAlbums(datos);
    });

    //Funciones que actualizan las variables con los datos.
    function updateDataSongs(newData){
        dataSong = JSON.parse(newData);
        songsUpdate = true;
        //alert('songs updated');
    };
    function updateDataAlbums(newData){
        dataAlbum = JSON.parse(newData);
        albumsUpdate = true;
        //alert('albums updated');
    };

    function getServer(){
        return self.location.hostname;
    //self.location.host
    //self.location.hostname
    };


    //Dejo aquí el userID o lo passo como parámetro a la función export?
    function getUserId(){
        userid = JSON.stringify(document.cookie);
        return userid;
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
};