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
//Estructuras que almacenan las funciones y las classes
var funciones = function(id){
    var funciones ={
        div         :{onclick:'', onhover:''},
        albumDiv    :{onclick:'', onhover:''},
        songDiv     :{onclick:'', onhover:''},
        imgDiv      :{onclick:'', onhover:''},
        divList     :{onclick:'', onhover:''},
        pList       :{onclick:'', onhover:''}
    };
    return funciones;
};
var nodeSets   ={
    div             :{
        class       :'row main-col-mosaic',
        tag         :'div'        
    },
    imgDiv          :{
        class       :'col-xs-12 col-sm-3 col-md-4',
        tag         :'div'      
    },
    albumDiv        :{
        class       :'col-xs-12 col-sm-9 col-md-8',
        tag         :'div'
    },
    songsDiv        :{
        class       :'col-12',
        tag         :'div'
    },
    liSongDetails   :{
        class       :'songDetails ilElement list-group-item',
        tag         :'li'
    },
    liAlbumDetails  :{
        class       :'albumDetails pElement',
        tag         :'li'
    },
    ulSongDetails   :{
        class       :'list-group',
        tag         :'ul'
    },
    ulAlbumDetails  :{
        class       :'list-group',
        tag         :'ul'
    },
    divList         :{
        class       :'',
        tag         :'div'
    },
    pListElm        :{
        class       :'',
        tag         :'p'
    }
};

//Estructuras para almacenar los datos.
function songDetails(){
    var songDetails     ={
        titulo      :   'titulo',
        pista       :   'pista',
        duracion    :   'duracion',
        cancionId   :   'songId',
        artistas    :   'artistas',
        class       :   nodeSets.liSongDetails.class  
        };
    return songDetails;    
};
function albumDetails(){
    var albumDetails    ={
        album   :   'titulo',
        artista :   'artista',
        year     :   'year',
        genero  :   'genero',
        tipo    :   'tipo',
        class   :   nodeSets.liAlbumDetails.class
    };
    return albumDetails;
};

//Estructura general de un nodo
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
var nodeStructure  ={
    nodeTag     :   '',
    id          :   '',
    class       :   ''
};

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

//Funciones
/*Recorre las estructuras de datos y devuelve un div con los detalles. Reemplazara al div con el mismo ID.
 * 
 * @param {type} id
 * @returns {Element|genDivStruct.nodeDiv}
 */
function generarDivDetalles(id){
    var nodeChildList=[];
    for(var sets in nodeSets){
        switch(sets){
            case 'imgDiv':
                nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, sets+id, nodeSets[sets].class, funciones(id)[sets],{child0:document.getElementById('img'+id)}));
                break;                
            case 'albumDiv':
                nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, sets+id, nodeSets[sets].class, funciones(id)[sets],genAlbumDetailsList(dataAlbum,id)));
                break;
            case 'songsDiv':
                nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, sets+id, nodeSets[sets].class, funciones(id)[sets],{child0: genSongList(dataSong,id)}));
                break;
            default:
        }
    }
    return genDivStruct(detailNodeStruct(nodeSets.div.tag, id, nodeSets.div.class, funciones(id)['div'], nodeChildList));
};
/*Recorre detailNodeStruct y devuelve el nodo definido en esa estructura.
 * 
 * @param {type} detailNodeStruct
 * @returns {Element|genDivStruct.nodeDiv}
 */
function genDivStruct(detailNodeStruct){
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
/*FUNCION A LA QUE LLAMAREMOS DESDE EL EVENTO ONCLICK
 * 
 * 
 * @param {identificacion del div} id
 * @returns {undefined}
 */
function mosaicDetails(id){
    if(isActive){
        isActive = deactivateDivMosaic(id);        
    }else{
        setActiveNode(id);
        isActive = true;
    }
    var pos = $('#imgDiv'+id).position().top;
    $(window).scrollTop(pos-5);
};
function detailsOnOff(id){
    if(songsUpdate&albumsUpdate){
        if(esMosaico){
            mosaicDetails(id);
        }else{
            listDetails(id);
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
function deactivateDivMosaic(id){
    document.getElementById("mainRow").replaceChild(activeDiv, document.getElementById(activeId));
    if(activeId === id){
        activeImg = activeId = activeDiv = null;
        return false;
    }
    setActiveNode(id)
    return true;
};
function setActiveNode(id){
    activeDiv = document.getElementById(id).cloneNode(true);
    document.getElementById('mainRow').replaceChild(generarDivDetalles(id), document.getElementById(id));
    activeId = id;
};
/*Devuelve un elemento UL con las canciones en data.
 *Data solo contiene canciones del album. 
 * @param {type} data
 * @returns {Element|genSongList.ulNode}
 */
function genSongList(data){
    var ulNode = document.createElement(nodeSets.ulSongDetails.tag);
    ulNode.setAttribute('class', nodeSets.ulSongDetails.class);
    
    var song = songDetails();
    for(var i=0; i < data.length; i++){
        var liNode = document.createTextNode('li');
        liNode.setAttribute('class', nodeSets.liSongDetails.class);
        
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
    ulNode.setAttribute('class', nodeSets.ulSongDetails.class);
    
    var song = songDetails();
    
    for(var i=0; i < data.length; i++){
        if(data[i].discoId === id){
            liNode = document.createElement('li');
            for(var key in song){
                switch(key){
                    case 'cancionId':
                        song[key] += data[i][key];
                        break;
                    case 'class':
                        break;
                    default:
                        song[key] = data[i][key];
                }                
            }
            
            liNode.setAttribute('id', song.cancionId);
            liNode.setAttribute('class', song.class);
            liNode.appendChild(document.createTextNode(song.pista + ' - ' + song.titulo + ' - ' + song.duracion));
            ulNode.appendChild(liNode);            
        }        
    }
    return ulNode;
};
/*Devuelve un elemento UL con los datos del album.
 * 
 */
function genAlbumDetailsList(data, id){
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
                pNode.setAttribute('class', album.class);
                pNode.appendChild(document.createTextNode(key + ': ' + album[key]));                
                nodeList[key] = pNode;
        }
    }
    return nodeList;
};


//Detalles mode lista.
/*DESACTIVA LA VENTANA CON LOS DETALLES Y ACTIVA LA NUEVA VENTANA EN CASO DE QUE SE HAYA SELECCIONADO OTRA.
 * 
 * @param {type} id
 * @returns {Boolean}
 */
function deactivateDivList(id){
    document.getElementById("mainUl").replaceChild(activeDiv, document.getElementById(activeId));    
    if(activeId === id){
        activeImg = activeId = activeDiv = null;
        return false;
    }
    setActiveElement(id);
    return true;
};
//Retorna un nuevo nodo hijo del nodo ID con los detalles del album.
function getChildToAppendNode(id, funcion){
    var newNode = document.getElementById(id).firstChild;
    return newNode.appendChild(funcion);    
};
//Reemplaza el elemento un elemento por otro. Detalles por no detalles y viceversa.
function setActiveElement(id){
        activeDiv = document.getElementById(id).cloneNode(true);
        activeId = id;        
        
        var newNode = getChildToAppendNode(id, getDivDetailsList(id));        
        document.getElementById('id').replaceChild(newNode, document.getElementById(id).firstChild);
};
//Activa los detalles del elemento seleccionado y desactiva el elemento que mostraba los detalles si lo hubiese.
function listDetails(id){
    if(isActive){
        isActive = deactivateDiv(id);
    }else{
        setActiveElement(id);
        isActive = true;
    }
    if(isActive){        
        var pos = $('#divList'+activeId).position().top;
        $(window).scrollTop(pos);
    }
};
//Devuelve un nodeo con los detalles del abum seleccionado.
function getDivDetailsList(id){
    newNode = genDivDetailList(setNewStruct(nodeSets.divList, id));
    newNode = genSongsList(newNode, id);
    
    return newNode;
};
//Devuelve una structura con los datos para crear el DIV q contendrá los detalles.
function setNewStruct(set, id){
    var newNodeStruct = nodeStructure;
    newNodeStruct.id = set+id;
    newNodeStruct.nodeTag = set.tag;
    newNodeStruct.class = set.class;
  
    return newNodeStruct;
};
//Devuelve un nuevo nodo para insertar los detalles de la canción en el modo lista con los valores pasados a la función mediante la variable nodeStruct
function genDivDetailList(nS){
    var newfunciones = funciones(id);
    var newNode = document.createElement(nS.nodeTag);
    newNode.setAttribute('id', nS.id );
    newNode.setAttribute('class', nS.id);

    for(var f in newfunciones.divList){
        newNode.setAttribute(f, newfunciones.divList[f]);
    }
    
    return newNode;
};
//Inserta un nodo hijo por cada canción en el nodo que se la pasa a la función.
function genSongsList(node, id){    
    for(var key in songDetails){
        if(songDetails[key]['discoId'] === id) {
            for(var song in songDetails[key]){
                node.appendChild(genSongListElementNode(song));
            }
        }
    }
    
    return node;
};
//Genera un nodo P con la pista y el título de la canción pasada a la función.
function genSongListElementNode(songData){
    var nodeP = document.createElement('p');
    nodeP.setAttribute('class', clases.pListElm);
    nodeP.setAttribute('id', 'songElement'+songData.id);
    nodeP.appendChild(document.createTextNode(songData.pista+ '-'+songData.titulo));
    
    return nodeP;    
};
