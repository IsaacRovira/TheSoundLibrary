//albumDetails.js

var id;

var songDetails = function songDetails(){
    var data = {
        titulo  :   'titulo',
        pista   :   'pista',
        duracion:   'duracion',
        id      :   'id',
        class   :   'ilElement'
    };
    return data;
};

var albumDetails = function albumDetails(){
    var data ={
            album   :   'titulo',
            artista :   'artista',
            year     :   'año',
            genero  :   'genero',
            tipo    :   'tipo',
            class   :   'clase'
        };
    return data;
};

var albumDetailsDiv = function albumDetailsDiv(){
    var data = {
        id  :   'albumDetails',
        class   :   'class',
        onClick :   'onClick()'  
    };
};

var songDetailsDiv = function songDetailsDiv(){
    var data = {
      id    :   'songDetails',
      class :   'clase'
    };
};

function albumDetails(titulo, artista, año, genero, tipo, clase){
    var data = {
        album   :   titulo,
        artista :   artista,
        año     :   año,
        genero  :   genero,
        tipo    :   tipo,
        class   :   clase
    };
    return data;
};

//Generar los Div e insertar los UL

var genAlbumDetails = function (id){
    var albumDiv = document.createElement('div');
    var songDiv  = document.createElement('div');
    
    songDiv.setAttribute('songDetailsDiv'+id);
    albumDiv.setAttribute('albumDetailsDiv'+id);
    
    albumDiv.setAttribute('class', albumDetailsDiv.class);
    songDiv.setAttribute('class', songDetailsDiv.class);
    
    albumDiv.appendChild(genAlbumDetailsList(albumData));
    songDiv.appendcChild(genSongList(songsData));
    
    document.getElementById(id).removeChild('<div class="col-12 infoText">');
        
};

//Generar en la lista de canciones.
var genDetailsList = function(datos){
  
  datos = JSON.parse(datos);
    
    
};


/* 
 *FUNCIONES AUX.
*/

//Devuelve un elemento UL con las canciones.
function genSongList(data){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', 'list-group');
    
    for(var i=0; i < data.lenght; i++){
        var ilNode = document.createTextNode('il');
        ilNode.setAttribute('class', songDetails.class);
        
        for(var key in songDetails){
            songDetails[key] = data[i][key];
        }
        
        var text = songDetails.pista + ' - ' + songDetails.titulo + ' - ' + songDetails.duracion;
        ilNode.setAttribute('id', 'song' + songDetails.id);
        ilNode.appendChild(text);
        ulNode.appendChild(ilNode);
        
        songDetails();
    }    
    return ulNode;
}

//Devuelve un elemento UL con los datos del album.
function genAlbumDetailsList(data){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', 'album-data');
    
    for(var i=0; i < data.length; i++){
        if(data[i].discoId === id){
            for(var key in albumDetails){
                if(key !== 'class'){
                    albumDetails[key] = data[i][key];
                }                
            }
            break;
        }
    }
    
    for(var key in albumDetails){
        var ilNode = document.createElement('il');
        ilNode.setAttribute('class', albumDetails[key]);
        ilNode.appendChild(key + ': ' +albumDetails[key]);
        ulNode.appendChild(ilNode);
    }
    return ulNode;
};



