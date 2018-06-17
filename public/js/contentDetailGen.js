//contentDetailGen.js

//******************************************************************************
//
//ESTRUCTURAS DE DATOS
//
//******************************************************************************

var classSet = {
    ulTag: {
        class: 'list-group'
    },
    ilTag: {
        class: 'ilTag'
    },
    ilTagSong: {
        class: 'ilTagSong'
    },
    songCol: {
        class: 'col-12 col-songList-detail'
    },
    imgTag: {
        class: 'img_mosaic_detail'
    },
    imgCol: {
        class: 'col-xs-12 col-sm-3 col-md-4 col-img-mosaic-detail'
    },
    albumDataCol: {
        class: 'col-xs-12 col-sm-9 col-md-8 col-albumData-detail'
    },
    ilTagAlbum: {
        class: 'ilTagAlbum'
    },
    h6Tag: {
        class: 'album-title-detail'
    },
    mainCol: {
        class: {
            details: 'col-12 main-col-detail',
            mosaic: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic'
        }
    },
    mainRow: {
        class: 'row main-row-detail'
    },
    figcap: {
        class: 'lead small'
    }
};

var imgAt = {
    src: '',
    alt: '',
    id: '',
    class: {
        mosaic: '',
        details: ''
    },
    path: commonData.path.get().cover,
    onclick: {
        mosaic: '',
        details: ''
    }
};

var discoDataForm = {
    id: '',
    titulo: '',
    soporte: '',
    cover: '',
    genero: '',
    artista: ''
};

//Genera div con los detalles de cada disco.
//Necesitamos los datos de las canciones el disco y del disco.
/*Estructura de ejemplo.
 * <div col-12>
 *      <div row>
 *          <div col-xs-12 col-sm-3> //imgCol
 *          <img>
 *          <div col-xs-12 col-sm-9> //albumDataCol
 *          <ul>datos album
 *          <div col-xs-12>         //songCol
 *          <ul>canciones
 */
//MOSTRAMOS LOS DETALLES DEL DISCO MODIFICAONDO EL DOM.
function getDiscDetails(datos) {
    var datosDisco = JSON.parse(datos);
    var discoData = discoDataForm;
    
    discoData = updateDiscoData(datosDisco[0]); //Actualizamos las variables con los datos del disco.

    //Eliminamos los child del DIV que contiene la info del album
    //antes de generar la nueva estructura.
    removeChildElements(discoData.id);

    var divNodeRow = document.createElement('div');
    divNodeRow.setAttribute('class', classSet.mainRow.class);
    divNodeRow.setAttribute('id', 'row_' + discoData.id);

    divNodeRow.appendChild(genImgCol(imgAt));
    divNodeRow.appendChild(genAlbumDataList(datosDisco[0]));

    document.getElementById(discoData.id).setAttribute('class', classSet.mainCol.class.details);
    document.getElementById(discoData.id).appendChild(divNodeRow);

    //Llamammos a la función que hará el query de las canciones y
    //que llamará luego a la función q las insertará en el DOM.
    //var param =[{'discoId':datosDisco[0]['discoId']}];
    var param = 'discoId=' + discoData.id;
    //alert(param);
    doQuery(param, url[0]['canciones'], addDiscDetailsSongs);
}
;
///INTRODUCIMOS LAS CANCIONES.
function addDiscDetailsSongs(datos) {
    var datosCanciones = JSON.parse(datos);
    //alert(JSON.stringify(datosCanciones));
    document.getElementById('row_' + datosCanciones[0]['discoId']).appendChild(genSongsList(datosCanciones));
}
;
var removeDiscDetails = function (datos) {
    datosDisco = JSON.parse(datos);
    var discoData = this.discoDataForm;
    discoData = updateDiscoData(datosDisco[0]);     //Actualizamos las variables con los datos del disco.       
    removeChildElements(discoData.id);  //Eliminamos todos los childs del DIV con la id del disco.

    var node = genDiscMosaicStruct(discoData);   //Generamosun figure node para insertarlo en el div con el id = discoId

    document.getElementById(discoData.id).appendChild(node);
    document.getElementById(discoData.id).setAttribute('class', classSet.mainCol.class.mosaic);
}
;
function genDiscMosaicStruct(discoData) {
    var text = document.createTextNode(discoData.titulo);
    var figcaptionNode = document.createElement('figcaption');
    var figureNode = document.createElement('figure');
    var imgNode = document.createElement('img');

    imgNode.setAttribute('src', imgAt.src);
    imgNode.setAttribute('alt', imgAt.alt);
    imgNode.setAttribute('onclick', imgAt.onclick.mosaic);
    imgNode.setAttribute('class', imgAt.class.mosaic);

    figcaptionNode.setAttribute('class', classSet.figcap.class);

    figcaptionNode.appendChild(text);
    figureNode.appendChild(imgNode);
    figureNode.appendChild(figcaptionNode);

    return figureNode;
}
;
//ONCLICK FUNCTION: llamaremos a esta función para abrir
//los detalles de los discos en modo mosáico.
var openDetails = function (valor) {
    //var param =[{'discoId':valor}];
    var param = 'discoId=' + valor;
    doQuery(param, url[0]['discos'], getDiscDetails);
}
;
var closeDetails = function (valor) {
    ////var param =[{'discoId':valor}];
    var param = 'discoId=' + valor;
    doQuery(param, url[0]['discos'], removeDiscDetails);
}
;
//******************************************************************************
//
//FUNCIONES AUXILIARES
//
//******************************************************************************
//Elimina todos los hijos de un node y devuelve el node vacio.
function removeChildElements(id) {
    var nodeChilds = document.getElementById(id).childNodes;
    while (nodeChilds.length > 0) {
        document.getElementById(id).removeChild(nodeChilds[0]);
    }
}
;
//Actualiza los datos de imgAtt y discoData
function updateDiscoData(datosDisco) {
    var discoData = discoDataForm;
    
    discoData.id = datosDisco['discoId'];
    discoData.titulo = datosDisco['album'];
    discoData.cover = datosDisco['img_cover'];
    discoData.soporte = datosDisco['tipo'];
    discoData.artista = datosDisco['artista'];

    imgAt.src = imgAt.path + datosDisco['img_cover'];
    imgAt.alt = datosDisco['album'];
    imgAt.onclick.details = 'closeDetails(' + discoData.id + ')';
    imgAt.onclick.mosaic = 'openDetails(' + discoData.id + ')';
    imgAt.class.details = 'img-thumbnail rounded mx-auto d-block img_mosaic_detail';
    imgAt.class.mosaic = 'img-thumbnail rounded mx-auto d-block img-mosaic';
    return discoData;
}
;
//Devuelve un DIV con un elemento img que muestra la carátula del album;
var genImgCol = function (imgAttrb) {
    var colNode = document.createElement('div');
    colNode.setAttribute('class', classSet.imgCol.class);

    var imgNode = document.createElement('img');
    imgNode.setAttribute('src', imgAttrb.src);
    imgNode.setAttribute('alt', imgAttrb.alt);
    imgNode.setAttribute('onclick', imgAttrb.onclick.details);  //Funcion que deshará la vista detalle..
    imgNode.setAttribute('class', classSet.imgTag.class);

    colNode.appendChild(imgNode);
    return colNode;
}
;
//Devuelve un DIV con la lista de canciones del album. ATENCION: OBTENER LISTA ORDENADA POR NUM PISTA.
var genSongsList = function (canciones) {
    var colNode = document.createElement('div');
    colNode.setAttribute('class', classSet.songCol.class);

    //Titulo del album
    var h5Node = document.createElement('h5');
    h5Node.setAttribute('class', classSet.h6Tag.class);
    h5Node.appendChild(document.createTextNode(discoData.titulo));
    colNode.appendChild(h5Node);

    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', classSet.ulTag.class);

    for (var i = 0; i < canciones.length; i++) {
        var text = document.createTextNode(canciones[i]['pista'] + ". " + canciones[i]['titulo']); //No tengo datos de duración.
        var ilNode = document.createElement('il');
        ilNode.setAttribute('class', classSet.ilTagSong.class);
        ilNode.setAttribute('id', canciones[i]['cancionId']);
        ilNode.appendChild(text);
        ulNode.appendChild(ilNode);
    }

    colNode.appendChild(ulNode);
    return colNode;
}
;
//Devuelve un DIV con una lista CON LOS DATOS DEL ALBUM
var genAlbumDataList = function (albumData) {
    var colNode = document.createElement('div');
    colNode.setAttribute('class', classSet.albumDataCol.class);

    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', classSet.ulTag.class);


    var text = document.createTextNode(albumData['album']);
    var ilNode = document.createElement('il');
    ilNode.setAttribute('class', classSet.ilTagAlbum.class);

    ulNode.appendChild(genListItem('Artista', albumData['artista']));
    ulNode.appendChild(genListItem('Genero', albumData['genero']));
    ulNode.appendChild(genListItem('Soporte', albumData['tipo']));

    colNode.appendChild(ulNode);

    return colNode;
}
;
//Devuelve un elemento IL en la forma nombre = valor;
var genListItem = function (nombre, valor) {
    var text = document.createTextNode(nombre + ": " + valor);
    var ilNode = document.createElement('il');
    ilNode.setAttribute('class', classSet.ilTagAlbum.class);
    ilNode.appendChild(text);

    return ilNode;
}
;
//Sin terminar
var genAlbumLabelDataList = function (AlbumLabel) {
}
;
