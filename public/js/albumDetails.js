//albumDetails.js

var activeId; //Id de album con detalles activos.
var activeDiv;
var id; //Id del album actual.

var songDetails;
var albumDetails;
var albumDetailsDiv;
var songDetailsDiv;

function songDetails(){
    var data = {
        titulo  :   'titulo',
        pista   :   'pista',
        duracion:   'duracion',
        id      :   'id',
        class   :   'ilElement'
    };
    return data;
};

function albumDetails(){
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

function albumDetailsDiv(){
    var data = {
        id  :   'albumDetails',
        class   :   'class',
        onClick :   'onClick()'  
    };
    return data;
};

function songDetailsDiv(){
    var data = {
      id    :   'songDetails',
      class :   'clase'
    };
    return data;
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
var genAlbumDetails = function (id, albumData, songsData){
    var albumDiv = document.createElement('div');
    var songDiv  = document.createElement('div');
    
    songDiv.setAttribute('songDetailsDiv'+id);
    albumDiv.setAttribute('albumDetailsDiv'+id);
    
    albumDiv.setAttribute('class', albumDetailsDiv.class);
    songDiv.setAttribute('class', songDetailsDiv.class);
    
    albumDiv.appendChild(genAlbumDetailsList(albumData));
    songDiv.appendcChild(genSongList(songsData));
    
    activeDiv = document.getElementById('dataDiv' + id);
    document.getElementById(id).removeChild(activeDiv);
    
    document.getElementById(id).appendChild(albumDiv);
    document.getElementById(id).appendChild(songDiv);
    
    activeId = id;
};

var deactivateDiv = function(){
    if(activeId !== null){
        var childNodes = document.getElementById(activeId).childNodes;
        document.getElementById(activeId).replaceChild(childNodes[childNodes.length-1]);
        document.getElementById(activeId).replaceChild(childNodes[childNodes.length-2]);
        document.getElementById(activeId).appendChild(activeDiv);
    }
    
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



