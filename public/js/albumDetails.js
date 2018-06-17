//albumDetails.js


var id; //Id del album actual.

//Utilizados por funciones en otros modulos.
//var activeDiv; //Almacena el div que muestra los detalles.
//var activeId; //Id de album con detalles activos.
//var isActive = false; //Existe algún elemento mostrando los detalles.
//var isUpdate = false;

var songDetails;
var albumDetails;

//ESTRUCTURAS DE DATOS
//*******************************************************
//
/*
 * Estructura para insertar los detalles del disco.
 * Esta función devuelve una objeto con los valores predeterminados de la estructura.
 * @returns {imgContainerNew.img}
 */
function imgContainerDetails(){
    var img = {
        mainDiv: {
            node:   'div',
            class:  'row',
            id:     'details_'
        },
        imgDiv: {
            node:   'div',
            class:  'col-3 imgColDiv'
        },
        img:    {
            node:   'img',
            class:  'imgNodeDetails',
            alt:    'Album title',
            src:    'src'
        },
        albumDiv:   {
            node:   'div',
            class:  'col-3 albumColDiv',
            id:     'id'
        },
                songsDiv:   {
            node:   'div',
            class:  'col-9 songsColDiv',
            id:     'id'
        }
    };
    return img;
}
;
//Estructuras que almacenan las funciones y las classes
var funciones = function (id) {
    var funciones = {
        div: {onclick: '', onhover: ''},
        albumDiv: {onclick: '', onhover: ''},
        songDiv: {onclick: '', onhover: ''},
        imgDiv: {onclick: '', onhover: ''},
        divList: {onclick: '', onhover: ''},
        pList: {onclick: '', onhover: ''}
    };
    return funciones;
}
;
//Atributos de los nodos. Determina el orden de los nodos.
var nodeSets = {    
    div: {
        tag:    'div',
        class:  'col-12 row main-col-mosaic-details',
        id:     'details_'
    },
    imgDiv: {
        tag:    'div',
        class:  'col-sm-hidden col-md-1',
        id:     'imgDetails_'
    },
    albumDiv: {
        tag:    'div',
        class:  'col-xs-1 col-md-2',
        id:     'albumDivDetails_'
    },
    songsDiv: {
        class: 'col-xs-11 col-md-10',
        tag: 'div',
        id: 'songsDivDetails_'
    },
    liSongDetails: {
        class: 'songDetails ilElement list-group-item-text',
        tag: 'li'
    },
    liAlbumDetails: {
        class: 'albumDetails pElement',
        tag: 'li'
    },
    ulSongDetails: {
        class: 'list-group',
        tag: 'ul'
    },
    ulAlbumDetails: {
        class: 'list-group',
        tag: 'ul'
    },
    divList: {
        class: '',
        tag: 'div'
    },
    pListElm: {
        class: '',
        tag: 'p'        
    }
}
;
var nodeSetsList = {
    div: {
        class: 'div-list-songs',
        tag: 'div',
        id: 'details_'
    },
    pListElement:{
        class:'p-list-element',
        tag: 'p',
        id: 'song_'
    }
}
;
//Estructuras para almacenar los datos.
function songDetails() {
    var songDetails = {
        titulo: 'titulo',
        pista: 'pista',
        //duracion: 'duracion',
        cancionId: 'songId',
        //artistas: 'artistas',
        class: nodeSets.liSongDetails.class
    };
    return songDetails;
}
;
function albumDetails() {
    var albumDetails = {
        //album: 'titulo',
        artista: 'artista',
        year: 'year',
        genero: 'genero',
        tipo: 'tipo',
        class: nodeSets.liAlbumDetails.class
    };
    return albumDetails;
}
;
//Estructura general de un nodo
var nodeStructure = {
    nodeTag: '',
    id: '',
    class: ''
}
;
function nodeStruct(tag, id, clase) {
    var node = {
        nodeTag: tag,
        id: id,
        class: clase
    };
    return node;
}
;
//Los parámetros "funciones" y "childs" se pasan como un objeto del tipo "valor1 = valor1".
function detailNodeStruct(tag, id, clase, funciones, childs) {
    var node = {
        nodeTag: tag,
        id: id,
        class: clase,
        functions: funciones,
        childNodes: childs
    };
    return node;
}
;

//MODO MOSAICO
//*****************************************************************************************
//Recorre las estructuras de datos y devuelve un div con los detalles.
function generarDivDetalles(id, songs) {    
    var nodeChildList = [];    
    for (var sets in nodeSets) {//Recorremos la estructura nodeSets y generamos los childs para el div que contendrá los detalles.
        switch (sets) {
            case 'imgDiv'://Node imgDiv contiene la carátula del disco.
                //nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, nodeSets[sets].id + id, nodeSets[sets].class, funciones(id)[sets],null)); //{child0: document.getElementById('img' + id)}
                break;
            case 'albumDiv'://Node albumDiv contiene los datos del album.
                nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, nodeSets[sets].id + id, nodeSets[sets].class, funciones(id)[sets], genAlbumDetailsList(commonData.datosDiscos.get(), id)));
                break;
            case 'songsDiv'://Node songsDiv contiene un listado con las canciones.
                nodeChildList[sets] = genDivStruct(detailNodeStruct(nodeSets[sets].tag, nodeSets[sets].id + id, nodeSets[sets].class, funciones(id)[sets], {child0: genSongList(songs, id)}));
                break;
            default:
        }
    }
    //Devolveremos el return de genDivStruct pasandole el nodeChildList generado.
    return genDivStruct(detailNodeStruct(nodeSets.div.tag, nodeSets.div.id + id, nodeSets.div.class, funciones(id)['div'], nodeChildList));
}
;
function detailsOnOff(id) {
    if (commonData.songsUpdateStatus.get() && commonData.albumsUpdateStatus.get()) {
        if (esMosaico) {
            mosaicDetails(id);
        }
        else {
            listDetails(id);
        }
    }
    else {
        alert('Fetching data. Please try later...');
    }
}
;
/*Activa o desactiva los detalles del album en modeo mosaico;
 *
 *
 * @param {identificacion del div} id
 * @returns {undefined}
 */
function mosaicDetails(id) {
    if (commonData.isActive.get()) { //Verifica si ya se están mostrando los detalles de un album.
        commonData.isActive.set(deactivateDivMosaic(id)); //Desactiva los detalles del album activo y activa los del album solicitado.
    }
    else {        
        //Obtiene las canciones datos del almbum.        
        doQuerySongsByAlbumId(commonData.url.get()['std']['general']['canciones'], id, setActiveNode);
    }
    //Desplazamos el cursor al div que desactiva los detalles.
    if (!commonData.isActive.get()) {
        scrollToSelectedElement(id);
    }
}
;
//Desactiva la ventana detalles activa y activa la nueva en caso de que se haya seleccionado otra, devolviendo falso o verdadero respectivamente.
function deactivateDivMosaic(id) {
    //Primero eliminamos el DIV con los detalles. ("details_" + id);
    if(!removeChildNodeById('mainRow', nodeSets.div.id + commonData.activeId.get())){
        removeChildNodeByClass(nodeSets.div.class);
    }
    //Si se ha hecho clic en el mismo id, ocultamos los detalles.
    if (commonData.activeId.get() === id) {        
        activeImg = null;
        commonData.activeId.set(null);
        commonData.activeDiv.set(null);
        removeSelected(id);
        return false;
    }
    //Si se ha hecho clic en otro album, lazamos la consulta para los detalles.
    doQuerySongsByAlbumId(commonData.url.get()['std']['general']['canciones'], id, setActiveNode);
    return true;
}
;
//Añade un nodo Div con los detalles del album.
/*
 * Añadiremos un div con los detalles debajo de la fila donde esta posicionado el div  del album seleccionado.
 * Determinaremos el último elemento de la fila que ocupa el DivSeleccionado.
 * Añadiremos un elemento child con los detalles del album que ocupara toda una fila.
 * Si el tamaño de la pantalla cambia debermos desactivar los detalles. 
 */
function setActiveNode(id, songs){
    //Insertamos el DIV con los detalles detras del último elemento con la misma posición que el DIV del album. La función getChildPosition nos dará el primer elemento de la fila siguiente.
    document.getElementById('mainRow').insertBefore(generarDivDetalles(id, songs),getChildPosition(id));
    //Actualizamos el elemento select.
    setSelected(id,commonData.activeId.get());
    //Almacenamos el nuevo ID que muestra los detalles.
    commonData.activeId.set(id);    
    //Marcamos como verdadero isActive como señal de control par ala función mosaicDetails.
    commonData.isActive.set(true);
    //Scroll hasta la posición del elemento q muestra los detalles.
    scrollToSelectedElement(id);
}
;
//Devuelve un elemento UL con las canciones en data. 
function genSongList(data) {
    var ulNode = document.createElement(nodeSets.ulSongDetails.tag);
    ulNode.setAttribute('class', nodeSets.ulSongDetails.class);

    var song = songDetails();
    for (var i = 0; i < data.length; i++) {
        var liNode = document.createTextNode('li');
        liNode.setAttribute('class', nodeSets.liSongDetails.class);

        for (var key in song) {
            song[key] = data[i][key];
        }

        liNode.setAttribute('id', 'song' + song.id);
        liNode.appendChild(document.createTextNode(song.pista + ' - ' + song.titulo + ' - ' + song.duracion));
        ulNode.appendChild(liNode);

        song = songDetails();
    }
    return ulNode;
}
;
//Devuelve un elemento UL con las canciones en data.
function genSongList(data, id) {
    var liNode;
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', nodeSets.ulSongDetails.class);

    var song = songDetails();

    for (var i = 0; i < data.length; i++) {
        if (data[i].discoId === id) {
            liNode = document.createElement('li');
            for (var key in song) {
                switch (key) {
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
}
;
//Devuelve un elemento UL con los datos del album.
function genAlbumDetailsList(data, id) {
    var nodeList = {};
    var pNode;
    var album = albumDetails();

    for (var i = 0; i < data.length; i++) {
        if (data[i].discoId === id) {
            for (var key in album) {
                if (key !== 'class') {
                    album[key] = data[i][key];
                }
            }
            break;
        }
    }

    for (var key in album) {
        switch (key) {
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
}
;
//Se desplaza a la posición del div con los detalles.
function positionChange(id){
    var top = document.getElementById(id).offsetTop;
    window.scrollTo(0,top);
}
;
//Establece la clase selected para el elemento seleccionado desactivando antes otro elemento selected si lo hubiese.
function setSelected(newId, oldId){
    var clase = document.getElementById(newId).getAttribute('class');
    if(oldId){
        document.getElementById(oldId).setAttribute('class', clase);
    }
    document.getElementById(newId).setAttribute('class', clase + " selected");
}
;
//Elimina selected del atributo clase del elemento id.
function removeSelected(id){
    var clase = document.getElementById(id).getAttribute('class').replace(" selected", "");
    document.getElementById(id).setAttribute('class', clase);
}
;

//MODO LISTA
//*******************************************************************************************
//Activa los detalles del elemento seleccionado.
function listDetails(id) {
    //Comprobamos si existe un elemento que muestra las canciones.
    if (commonData.isActive.get()) {
    //Si existe, llamamos a la función deactivateDiv.
        commonData.isActive.set(deactivateDivList(id));
    }
    else {
    //Si no exite, llamamos directamente a setActiveElement para obtener las canciones.
        doQuerySongsByAlbumId(commonData.url.get()['std']['general']['canciones'], id, setActiveElement);        
    }
    //Centramos la siempre la ventana en el elemento seleccionado.
    scrollToSelectedElement(id);
}
;
//Desactiva la ventana con los detalles y genera una nueva en caso de que se haya seleccionado otro album.
function deactivateDivList(id) {
    //Primero eliminamos el DIV que muestra los detalles.
    removeChildNodeByClass('div-list-songs');
    //Se hemos hecho clic en la misma id, solo dejamos de mostrar los detalles y devolvemos false.
    if (commonData.activeId.get() === id) {
        commonData.activeId.set(null);
        commonData.activeDiv.set(null);
        return false;
    }
    //Si hemos hecho clic sobre otra id, solicitamos los detalles de las canciones para la nueva id.
    doQuerySongsByAlbumId(commonData.url.get()['std']['general']['canciones'], id, setActiveElement);
    return true;
}
;
//Inserta un div con los detalles de las canciones en el modo lista.
function setActiveElement(id, songs){
    //Insertamos el nuevo DIV con las canciones.    
    document.getElementById('container_'+id).insertBefore(genDivStruct(detailNodeStruct(nodeSetsList.div.tag,
    nodeSetsList.div.id + id,
    nodeSetsList.div.class,
    null,
    genSongsList(songs))),
    null);
    //Guardamos el id del elemento q almacena los detalles.
    commonData.activeId.set(id);
    //Definimos isActive como true
    commonData.isActive.set(true);
    //Desplazamos la pantalla hasta el elemento activo.
    scrollToSelectedElement(id);
}
;
//Devuelve un array de nodos hijo. Un por canción en el nodo que se la pasa a la función.
function genSongsList(songs){
    var node = {};
    var i = 0;
    for (var song in songs) {        
        node[i]=genSongListElementNode(songs[song]);
        i++;
    }
    return node;
}
;
//Devuelve un nodo P con la pista y el título de la canción pasada a la función.
function genSongListElementNode(songData) {
    var nodeP = document.createElement('p');
    nodeP.setAttribute('class', nodeSetsList.pListElement.class);
    nodeP.setAttribute('id', nodeSetsList.pListElement.id + songData.id);
    nodeP.appendChild(document.createTextNode(songData['pista'] + '-' + songData['titulo']));

    return nodeP;
}
;

//AUX
//*****************************************************************************************
/*Recorre la estructura generada por "detailNodeStruct" y devuelve el nodo definido en esa estructura.
 *
 * @param {type} detailNodeStruct
 * @returns {Element|genDivStruct.nodeDiv}
 */
function genDivStruct(detailNodeStruct) {
    var nodeDiv;
    for (var key in detailNodeStruct) {
        switch (key) {
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
                for (var fs in detailNodeStruct[key]) {
                    nodeDiv.setAttribute(fs, detailNodeStruct[key][fs]);
                }
                break;
            case 'childNodes':
                for (var chNs in detailNodeStruct[key]) {
                    nodeDiv.appendChild(detailNodeStruct[key][chNs]);
                }
                break;
            default:
        }
    }
    return nodeDiv;
}
;
//Devuelve el último nodo de la fila con la misma posición que el nodo id. Si id es el último nodo devuleve null
function getChildPosition(id){
    var nodeList = document.getElementById('mainRow').childNodes;
    var idPos = document.getElementById(id).offsetTop;
    
    for(var i = 0; i < nodeList.length; i++){        
        if(id == nodeList[i].getAttribute('id')){            
            for(var n = i; n < nodeList.length; n++){
                if(idPos !== nodeList[n].offsetTop){                    
                    return nodeList[n];
                }
                if(n === nodeList.length-1){
                    return null;
                }
            }
        }
    }    
}
;
//Elimina un nodo por id. Devuelve verdadero si lo ha borrado, lo vuelve a intentar en caso contrario.
function removeChildNodeById(parentNodeId, childNodeId){
    var nodeList = document.getElementById(parentNodeId).childNodes;
    
    for(var i = 0; i < nodeList.length; i++){
        if(nodeList[i].getAttribute('id') === childNodeId){
            document.getElementById(parentNodeId).removeChild(nodeList[i]);
            return true;
        }
    }
    return removeChildNodeById(parentNodeId, childNodeId);
}
;
//Elimina todos los nodos de una clase. Si existe algún elemento los borra y devuleve verdadero, en caso contrario devuelve falso.
function removeChildNodeByClass(clase){
    var nodeList = document.getElementsByClassName(clase);
    
    if(nodeList.length < 1) return false;
    
    for(var i = 0; i < nodeList.length; i++){
        var parentID= nodeList[i].parentNode.id;
        document.getElementById(parentID).removeChild(nodeList[i]);
    }
    return true;
}
;
//Desplaza la ventana verticalmente hasta el elemento id.
function scrollToSelectedElement(id){
    var pos = document.getElementById(id).offsetTop;
    window.scrollTo(0,pos);
}
;