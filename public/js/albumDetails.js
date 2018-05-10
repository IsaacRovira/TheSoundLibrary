//albumDetails.js

var activeId; //Id de album con detalles activos.
var activeDiv;
var id; //Id del album actual.
var active = false;



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
        class   :   'songDetails ilElement'
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
            class   :   'albumDetails'
        };
    return data;
};

function albumDetailsDiv(){
    var data = {
        id  :   'albumDetails',
        class   :   'albumDetailsDiv',
        onClick :   'onClick()'  
    };
    return data;
};

function songDetailsDiv(){
    var data = {
      id    :   'songDetails',
      class :   'songDetailsDiv',
      onClick :   'onClick()'
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

function removeLastChild(id){
    var nodeChildList = document.getElementById(id).childNodes;
    return document.getElementById(id).removeChild(nodeChildList[nodeChildList.length-1]);
};

//Generar los Div e insertar los UL
var insertAlbumDetails = function (id, albumData, songsData){
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
    //activeDiv = removeLastChild(this.id);
    
    document.getElementById(id).appendChild(albumDiv);
    document.getElementById(id).appendChild(songDiv);
    
    activeId = id;
    active = true;
};

function restoreDiv(id){    
    var childNodes = document.getElementById(activeId).childNodes;
    document.getElementById(id).replaceChild(childNodes[childNodes.length-1]);
    document.getElementById(id).replaceChild(childNodes[childNodes.length-2]);
    document.getElementById(id).appendChild(id);
    
    docuement.getElementById('img'+id).setAttribute('class', imgContainerNew().imgDiv.class);
};

var deactivateDiv = function(){    
    if(active & activeId === id){
        restoreDiv(activeId);        
        active = false;
        activeId = null;
        avtiveDiv = null;
    }else{
        if(active){
            restoreDiv(activeId);
        }
        insertAlbumDetails(id, albumData, songsData);        
    }
};

//Generar en la lista de canciones.
var genDetailsList = function(datosS, datosD){
    datosS = JSON.parse(datosS);
    datosD = JSON.parse(datosD);
    
       
    
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



