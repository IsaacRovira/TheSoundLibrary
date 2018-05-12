//albumDetails.js

var activeId; //Id de album con detalles activos.
var activeDiv; //Almacena el div que muestra los detalles.
var id; //Id del album actual.
var isActive = false;
var isUpdate = false;

var dataSong;
var dataAlbum;

var songDetails;
var albumDetails;

var funciones = function(id){
    var funciones ={
        div         :{onclick:'showDetails('+id+')', onhover:''},
        albumDiv    :{onclick:'', onhover:''},
        songDiv     :{onclick:'', onhover:''},
        imgDiv     :{onclick:'', onhover:''}
    };
    return funciones;
};
    
var clases  ={div:'col-12', imgDiv:'col-3', albumDiv:'col-9', songsDiv:'col-12', ilSongDetails:'songDetails ilElement', ilAlbumDetails:'albumDetails ilElement', ulSongDetails:'list-group', ulAlbumDetails:'list-group'};

/*Recorre las estructuras de datos y devuelve un div con los detalles. Reemplazara al div con el mismo ID.
 * 
 * @param {type} id
 * @returns {Element|genDivStruct.nodeDiv}
 */
var generarDivDetalles  =   function(id){    
    var nodeChildList   ={
        albumDiv    : genDivStruct(detailNodeStruct('div', 'albumDiv'+id, clases['albumDiv'], funciones(id)['album'], {child0: genAlbumList(dataSong,id)})),
        songDiv     : genDivStruct(detailNodeStruct('div', 'songsDiv'+id, clases['songsDiv'], funciones(id)['song'], {child0: genSongList(dataAlbum, id)})),
        imgDiv      : genDivStruct(detailNodeStruct('div', 'imgDiv'+id, clases['imgDiv'], funciones(id)['img'], {child0: document.getElementById('img'+id)}))
    };
    return genDivStruct(detailNodeStruct('div', id, clases['div'], funciones(id)['Div'], nodeChildList));
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
            year     :   'año',
            genero  :   'genero',
            tipo    :   'tipo',
            class   :   'albumDetails ilElement'
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

/*FUNCION A LA QUE LLAMAREMOS DESDE EL EVENTO ONCLICK
 * 
 * 
 * @param {identificacion del div} id
 * @returns {undefined}
 */
var showDetails = function(id){
    if(isUpdate){
        dataSong = JSON.parse(datosCanciones);
        dataAlbum = JSON.parse(datosDiscos);
        if(isActive){
            isActive = deactivateDiv(id);
        }else{
            activeId = document.getElementById('mainRow').replaceChild(generarDivDetalles(id), document.getElementById(id));
            isActive = true;
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
    document.getElementById("mainRow").replaceChild(activeId, activeDiv);
    if(activeId === id){        
        activeId = null;
        avtiveDiv = null;
        return false;
    }    
    activeId = document.getElementById('mainRow').replaceChild(generarDivDetalles(id), document.getElementById(id));
    return true;
};

//Generar en la lista de canciones.
var genDetailsList = function(datosS, datosD, id){
    
    var songsData = JSON.parse(datosS);
    var albumData = JSON.parse(datosD);
    
};

/*Devuelve un elemento UL con las canciones en data.
 *Data solo contiene canciones del album. 
 * @param {type} data
 * @returns {Element|genSongList.ulNode}
 */
function genSongList(data){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases['ulSongDetails']);
    
    for(var i=0; i < data.lenght; i++){
        var ilNode = document.createTextNode('il');
        ilNode.setAttribute('class', clases['ilSongDetails']);
        
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
};

/*Devuelve un elemento UL con las canciones en data.
 *Data contiene canciones de todos los albumes. 
 * @param {type} data
 * @param {type} id
 * @returns {Element|genSongList.ulNode}
 */
function genSongList(data, id){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases.ulSongDetails);
    
    for(var i=0; i < data.lenght; i++){
        if(data[i].discoId === id){
            var ilNode = document.createTextNode('il');
            for(var key in songDetails){
                switch(key){
                    case 'cancionId':
                    case 'class':
                        songDetails[key] += data[i][key];
                        break;
                    default:
                        songDetails[key] = data[i][key];
                }                
            }
            var text = songDetails.pista + ' - ' + songDetails.titulo + ' - ' + songDetails.duracion;
            ilNode.setAttribute('id', songDetails.cancionId);
            ilNode.setAttribute('class', clases['ilSongDetails']);
            ilNode.appendChild(text);
            ulNode.appendChild(ilNode);
            
            songDetails();
        }
    }
    return ulNode;
};

/*Devuelve un elemento UL con los datos del album.
 * 
 */
function genAlbumDetailsList(data, id){
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', clases.ulAlbumDetails);
    
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
        ilNode.setAttribute('class', clases['ilAlbumDetails']);
        ilNode.appendChild(key + ': ' +albumDetails[key]);
        ulNode.appendChild(ilNode);
    }
    return ulNode;
};