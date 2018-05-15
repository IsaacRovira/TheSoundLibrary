//albumDetails.js

var activeId; //Id de album con detalles activos.
var activeDiv; //Almacena el div que muestra los detalles.
var id; //Id del album actual.
var isActive = false;
var isUpdate = false;
var songDetails;
var albumDetails;

//ESTRUCTURAS DE DATOS
//*******************************************************
var funciones = function(id){
    var funciones ={
        div         :{onclick:'showDetails('+id+')', onhover:''},
        albumDiv    :{onclick:'', onhover:''},
        songDiv     :{onclick:'', onhover:''},
        imgDiv     :{onclick:'', onhover:''}
    };
    return funciones;
};    
var clases  ={div:'row main-col-mosaic', imgDiv:'col-xs-12 col-sm-3 col-md-4', albumDiv:'col-xs-12 col-sm-9 col-md-8', songsDiv:'col-12', liSongDetails:'songDetailsli list-group-item', liAlbumDetails:'albumDetailsli', ulSongDetails:'list-group', ulAlbumDetails:'list-group'};

//Funciones que almacenan los detalles de la estructura de un nodo.
var detailNodeStruct = function(){
    var nodeList    ={        
        nodeTag     :   'div',
        id          :   '',
        class       :   'col-12',
        functions   :   {
            onClick     :   '',            
            onHover     :   ''
        },
        childNodes  :   {
            child1      :   nodeStruct(),
            child2      :   nodeStruct(),
            child3      :   nodeStruct()
        }
    };
    return nodeList;
};
var detailNodeStruct = function(tag, id, clase, funcion1, funcion2, child1, child2, child3){
    var nodeList    ={        
        nodeTag     :   tag,
        id          :   id,
        class       :   clase,
        functions   :   {
            onClick     :   funcion1,
            onHover     :   funcion2
        },
        childNodes  :   {
            child1      :   child1,
            child2      :   child2,
            child3      :   child3
        }
    };
    return nodeList;
};
//Funciones y childs son un array de funciones y nodos hijos.
var detailNodeStruct = function(tag, id, clase, funciones, childs){
    var nodeList    ={        
        nodeTag     :   tag,
        id          :   id,
        class       :   clase,
        functions   :   funciones,
        childNodes  :   childs
        };
    return nodeList;    
};

//Estructura general de un nodo
var nodeStruct = function(){
    var node   ={
            nodeTag     :   'div',
            id          :   '',
            class       :   '',
            functions   :   {
                onClick     :   '',            
                onHover     :   ''
            },
            childNodes  :   {
                child1      :   '',
                child2      :   '',
                child3      :   '',
                child4      :   ''
            }
    };
    return node;
};
var nodeStruct = function(tag, id, clase){
    var node   ={
            nodeTag     :   tag,
            id          :   id,
            class       :   clase,
            functions   :   {
                onClick     :   '',            
                onHover     :   ''
            },
            childNodes  :   {
                child1      :   '',
                child2      :   '',
                child3      :   '',
                child4      :   ''
            }
    };
    return node;
};

//Estructuras para almacenar los datos.
function songDetails(){
    var data = {
        titulo      :   'titulo',
        pista       :   'pista',
        duracion    :   'duracion',
        cancionId   :   'songId',
        artistas    :   'artistas',
        class       :   'songDetails ilElement'
    };
    return data;
};
function albumDetails(){
    var data ={
            album   :   'titulo',
            artista :   'artista',
            year     :   'year',
            genero  :   'genero',
            tipo    :   'tipo',
            class   :   'albumDetails ilElement'
        };
    return data;
};
//*****************************************************

//FUNCIONES
//*****************************************************
/*Recorre las estructuras de datos y devuelve un div con los detalles. Reemplazara al div con el mismo ID.
 * 
 * @param {type} id
 * @returns {Element|genDivStruct.nodeDiv}
 */
var generarDivDetalles  =   function(id){    
    var nodeChildList   ={
        imgDiv      : genDivStruct(detailNodeStruct('div', 'imgDiv'+id, clases['imgDiv'], funciones(id)['img'], {child0: document.getElementById('img'+id)})),
        albumDiv    : genDivStruct(detailNodeStruct('div', 'albumDiv'+id, clases['albumDiv'], funciones(id)['album'], genAlbumDetailsList(dataAlbum, id))),
        songDiv     : genDivStruct(detailNodeStruct('div', 'songsDiv'+id, clases['songsDiv'], funciones(id)['song'], {child0: genSongList(dataSong, id)}))        
    };
    return genDivStruct(detailNodeStruct('div', id, clases['div'], funciones(id)['div'], nodeChildList));
};

/*Recorre detailNodeStruct y devuelve el nodo definido en esa estructura.
 * 
 * @param {type} detailNodeStruct
 * @returns {Element|genDivStruct.nodeDiv}
 */
var genDivStruct = function(detailNodeStruct){
    var nodeDiv;
    for(var key in detailNodeStruct){
        switch(key){
            case 'nodeTag':
                nodeDiv = document.createElement(detailNodeStruct[key]);
                break;
            case 'id':
                nodeDiv.setAttribute(key, detailNodeStruct[key]);
                break;
            case 'class':
                nodeDiv.setAttribute(key, detailNodeStruct[key]);
                break;
            case 'functions':
                for(var fs in detailNodeStruct[key]){
                    nodeDiv.setAttribute(fs, detailNodeStruct[key][fs]);
                }
                break;
            case 'childNodes':
                for(var chNs in detailNodeStruct[key]){
                    nodeDiv.appendChild(detailNodeStruct[key][chNs]);
                }
                break;
            default:                
        }
    }
    return nodeDiv;
};

function isUpdateF(A,B){
    if(A===B){
        return false;
    }
    return true;
};

/*FUNCION A LA QUE LLAMAREMOS DESDE EL EVENTO ONCLICK
 * 
 * 
 * @param {identificacion del div} id
 * @returns {undefined}
 */
var showDetails = function(id){
    if(songsUpdate&albumsUpdate){        
        if(isActive){
            isActive = deactivateDiv(id);
        }else{
            activeDiv = document.getElementById(id).cloneNode(true);
            document.getElementById('mainRow').replaceChild(generarDivDetalles(id), document.getElementById(id));
            activeId = id;            
            isActive = true;
            var pos = $('#imgDiv'+id).position().top;
            $(window).scrollTop(pos);            
        }
    }else{
        alert('Fetching data. Please try later...');
    }
};

/*DESACTIVA LA VENTANA CON LOS DETALLES Y ACTIVA LA NUEVA VENTANA EN CASO DE QUE SE HAYA SELECCIONADO OTRA.
 * 
 * @param {type} id
 * @returns {Boolean}
 */
var deactivateDiv = function(id){
    document.getElementById("mainRow").replaceChild(activeDiv, document.getElementById(activeId));
    //document.getElementById('imgDiv'+activeId).appendChild(activeImg);
    if(activeId === id){
        activeImg = activeId = activeDiv = null;
        return false;
    }    
    activeDiv = document.getElementById(id).cloneNode(true);
    document.getElementById('mainRow').replaceChild(generarDivDetalles(id), document.getElementById(id));
    activeId = id;
    var pos = $('#imgDiv'+id).position().top;
    $(window).scrollTop(pos);
    return true;
};

function seeNodes(node){
    var newNode = node;
    var nodeList = node.childNodes;
    for(var n in nodeList){
        var nodeChild = document.getElementById(n.getAttribute('id'));
        
        newNode.appendChild(nodeChild);
        seeNodes(n);
    }
    return newNode;
}

function storeElement(id){
    var nodeList = document.getElementById(id).childNodes;
       
};
/*Devuelve un elemento UL con las canciones en data.
 *Data solo contiene canciones del album. 
 * @param {type} data
 * @returns {Element|genSongList.ulNode}
 */
function genSongList(data){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases['ulSongDetails']);
    
    var song = songDetails();
    for(var i=0; i < data.length; i++){
        var liNode = document.createTextNode('li');
        liNode.setAttribute('class', clases['ilSongDetails']);
        
        for(var key in song){
            song[key] = data[i][key];
        }       
        
        liNode.setAttribute('id', 'song' + song.id);
        liNode.appendChild(document.createTextNode(song.pista + ' - ' + song.titulo + ' - ' + song.duracion));
        ulNode.appendChild(liNode);
        
        song = songDetails();
    }    
    return ulNode;
};

/*Devuelve un elemento UL con las canciones en data.
 *Data contiene canciones de todos los albumes. 
 * @param {type} data
 * @param {type} id
 * @returns {Element|genSongList.ulNode}
 */
function genSongList(data, id){
    var liNode;
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases.ulSongDetails);
    
    var song = songDetails();
    
    for(var i=0; i < data.length; i++){
        if(data[i].discoId === id){
            liNode = document.createElement('li');
            for(var key in song){
                switch(key){
                    case 'cancionId':
                    case 'class':
                        song[key] += data[i][key];
                        break;
                    default:
                        song[key] = data[i][key];
                }                
            }
            liNode.setAttribute('id', song.cancionId);
            liNode.setAttribute('class', clases['liSongDetails']);
            liNode.appendChild(document.createTextNode(song.pista + ' - ' + song.titulo + ' - ' + song.duracion));
            ulNode.appendChild(liNode);
            
            song = songDetails();
        }
    }
    return ulNode;
};

/*Devuelve un elemento UL con los datos del album.
 * 
 */
function genAlbumDetailsList(data, id){    
    /*
    var liNode;
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases.ulAlbumDetails);
    */
   var nodeList={};
   var pNode;
   var album = albumDetails();
    
    for(var i=0; i < data.length; i++){
        if(data[i].discoId === id){
            for(var key in album){
                if(key !== 'class'){
                    album[key] = data[i][key];
                }
            }
            break;
        }
    }
    
    for(var key in album){        
        switch(key){
            case 'class':
                break;
            default:
                pNode = document.createElement('p');
                pNode.setAttribute('class', clases['liAlbumDetails']);
                pNode.appendChild(document.createTextNode(key + ': ' + album[key]));
                //ulNode.appendChild(liNode);
                nodeList[key] = pNode;
        }
    }
    
    /*
     * albumDetails(){
            album   :   'titulo',
            artista :   'artista',
            year     :   'year',
            genero  :   'genero',
            tipo    :   'tipo',
            class   :   'albumDetails ilElement'
        }
     */
    //return ulNode;
    return nodeList;
};