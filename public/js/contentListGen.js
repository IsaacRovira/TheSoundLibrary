//contentListGen.js

//Genera un listado con la consulta devuelta atendiendo a la estructura siguiente:

/*Estructura de referencia
 * <ul class="list-group">
 * <li class="list-group-item" id="songid">
 * <div class="row">
 *      <div class="col-3">
 *          <img src="" alt="">
 *      </div>
 *      <div class="col-9">
 *          <p>Album Title</p>
 *          <p>Artista</p>
 *          <p>Genero</p>
 *      </div>
 *</div>
 *</li>
 *</ul>
 */

var imgAtt = {
    fileName: "filename",
    path: 'this.onerror=null;this.src=' + commonData.path.get().cover + 'nopic.png',
    src: "PATH",
    class: "img-list",
    alt: "texto",
    width: "100%",
    onclick: ""
}
;
var liAtt = {
    class: 'list-group-item',
    id: 'discoID',
    onclick: 'test()'
}
;
var pText = {
    album: 'album',
    artista: 'artista',
    sello: 'discografica',
    year: 'year',
    genero: 'genero',
    class: {
        album: 'list-info text-album',
        artista: 'list-info text-artista sss',
        genero: 'list-info text-genero sss',
        soporte: 'list-info text-soporte sss'
    }
}
;
var colClass = {
    img: 'col-2 div-list-img',
    txt: 'col-8 div-list-text'
}
;
var containerDiv = {
    tag:    'div',
    id:     'container_',
    class:  'row row-list-item'            
}
;
//Crea los elementos Li de la estructura.
function genLiNode(valor) {
    var liNode = document.createElement('li');
    liNode.setAttribute('class', valor.class);
    liNode.setAttribute('id', valor.id);
    //liNode.setAttribute('onclick', valor.onclick);

    return liNode;
}
;
//Crea los elementos P de la estructura para la inserciÃ³n de los datos texto.
function genPNode(valor, key) {
    var pNode = document.createElement('p');
    pNode.setAttribute('class', pText.class[key]);
    pNode.appendChild(document.createTextNode(valor[key]));
    return pNode;
}
;
//Crea los elementos DIV de la clase column para la inserciÃ³n de los datos del album.
function genDivColNode(valor) {
    var divColNode = document.createElement('div');
    divColNode.setAttribute('class', colClass.txt);
    divColNode.appendChild(genPNode(valor, 'album'));
    divColNode.appendChild(genPNode(valor, 'artista'));
    divColNode.appendChild(genPNode(valor, 'genero'));

    return divColNode;
}
;
//Crea los elementos DIV de la clase column para la inserciÃ³n de la imÃ¡genes.
function genDivColNodeOne(valor){
    var divColNode = document.createElement('div');
    divColNode.setAttribute('class', colClass.txt);
    divColNode.appendChild(genPNode(valor.album));

    return divColNode;
}
;
//Crea los elementos IMG para la inserción de las imÃ¡genes de los albunes.
function genImgNode(data) {
    var img_Node = document.createElement('img');
    img_Node.setAttribute('class', data.class);
    img_Node.setAttribute('alt', data.alt);
    img_Node.setAttribute('src', data.src);
    img_Node.setAttribute('onclick', data.onclick);

    return img_Node;
}
;
//Crea los elementos DIV de clase row para la inserciÃ³n de los elementos DIV de clase COLUMN con los datos y la imÃ¡gen del album.
function genRowColNode(texto, data, id) {
    var divRowNode = document.createElement(containerDiv.tag);    
    divRowNode.setAttribute('class', containerDiv.class);
    divRowNode.setAttribute('id', containerDiv.id+id);

    var divColNode = document.createElement('div');
    divColNode.setAttribute('class', colClass.img);
    divColNode.appendChild(genImgNode(data));
    divRowNode.appendChild(divColNode);

    divRowNode.appendChild(genDivColNode(texto));

    return divRowNode;
}
;
//Si el alrgumento 1 es nulo devuelve el argumento 2
var altValue = function (valorOrg, valorAlt) {
    if (!valorOrg)
        return valorAlt;
    return valorOrg;
}
;
//Genera la lista con los albunes atendiendo a la estructura indicada mÃ¡s arriba.
function genImageList(data) {
    var ulNode = document.createElement('ul');
    ulNode.setAttribute('class', 'list-group');
    ulNode.setAttribute('id', 'mainUl');

    for (var i = 0; i < data.length; i++) {
        liAtt.id = data[i]['discoId'];

        imgAtt.src = commonData.path.get().cover + data[i]['img_cover'];
        imgAtt.alt = data[i]['album'];
        imgAtt.fileName = data[i]['img_cover'];
        imgAtt.onclick = 'detailsOnOff(' + data[i]['discoId'] + ')';

        for (var key in pText) {
            switch (key) {
                case 'class':
                    break;
                case 'album':
                    pText[key] = altValue(data[i][key], "Título del album");
                    break;
                default:
                    //pText[key] = key + ": " + altValue(data[i][key], "*******");
                    pText[key] = key + ": " + data[i][key] || "*******";
            }
        }
        var liNode = genLiNode(liAtt);
        liNode.appendChild(genRowColNode(pText, imgAtt, data[i].discoId));

        ulNode.appendChild(liNode);
    }
    document.getElementById('mainRow').appendChild(ulNode);
}
;