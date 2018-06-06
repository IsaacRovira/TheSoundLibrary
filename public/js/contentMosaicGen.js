//contentGenerator.js

/*NUEVA ESTRUCTURA*/
/*
 * Generar struct q reproduza esta estructura.
 *
 * <div class="col-lo q toque" id="id del album">
 *  <div class="col-12">
 *      <img onclick="mostrar detalles" alt="nombre album" src="foto">
 *  <div>
 *  <div class="col-12 datos_img">
 *      <h4>Titulo del Album</h4>
 *  </div>
 * </div>
 *
 */

function imgContainerNew() {
    var img = {
        mainDiv: {
            node: 'div',
            class: 'col-xs-12 col-sm-6 col-md-3 col-lg-2 mainDivMosaic',
            id: 'id'
        },
        imgDiv: {
            node: 'div',
            class: 'col-12 imgDivMosaic',
            onclick: '',
            onhover: '',
            id: 'imgDiv'
        },
        imgTag: {
            node: 'img',
            class: 'col-12 imgTagMosaic',
            alt: '',
            src: '',
            onerror: 'this.onerror=null;this.src=' + commonData.path.get().cover + 'nopic.png',
            onclick: '',
            id: 'img'
        },
        dataDiv: {
            node: 'div',
            class: 'col-12 dataDivMosaic',
            id: 'dataDiv'
        },
        hTag: {
            node: 'h4',
            class: ''
        }
    };
    return img;
}
;
var genImageMosaico = function (data) {
    //data = JSON.parse(data);

    for (var i = 0; i < data.length; i++) {
        imgContainer = updateImgContainerValues(data[i], imgContainerNew());
        imgContainer = genNodes(imgContainer);
        imgContainer = buildTheStructure(data[i], imgContainer);

        document.getElementById('mainRow').appendChild(imgContainer.mainDiv.node);
    }
};

//**************************************
//FUNCIONES AUXILIARES
//**************************************
function showImgContainer(org) {
    dest = org;
    for (var key in org) {
        for (var item in key) {
            alert(key + '-' + item + ' : ' + key[item]);
        }
    }
}
;
//Actualizar valores en imgContainer
function updateImgContainerValues(datos, container) {
    for (var key in datos) {
        switch (key) {
            case 'discoId':
                container.mainDiv.id = datos[key];
                container.imgTag.onclick = 'detailsOnOff(' + datos[key] + ')';
                container.imgDiv.id += datos[key];
                container.imgTag.id += datos[key];
                container.dataDiv.id += datos[key];
                break;
            case 'album':
                container.imgTag.alt = datos[key];
                break;
            case 'img_cover':
                container.imgTag.src = commonData.path.get().cover + datos[key];
                break;
        }
        ;
    }
    return container;
}
;
/*Genera los nodos en el campo nodo de cada elemento de imgContainer
 según el valor del elemento node dentro de imgContainer y establace los atributos en el nodo creado según los valores de los atributos de imgContainer.
 */
function setAttributes(elemento) {
    for (var key in elemento) {
        //alert(key);
        switch (key) {
            case 'node':
                elemento.node = document.createElement(elemento[key]);
                break;
            default:
                elemento.node.setAttribute(key, elemento[key]);
                break;
        }
        ;
    }
    return elemento;
}
;
//Recorre los elementos de "imgContainer" y aplica cada subelemento node los atributos definidos para ese elemento en "imgContainer".
function genNodes(nodes) {
    for (var key in nodes) {
        nodes[key] = setAttributes(nodes[key]);
    }
    return nodes;
}
;
function buildTheStructure(datos, contenedor) {
    contenedor.hTag.node = document.createTextNode(datos['album']);
    contenedor.dataDiv.node.appendChild(contenedor.hTag.node);
    contenedor.imgDiv.node.appendChild(contenedor.imgTag.node);
    contenedor.imgDiv.node.appendChild(contenedor.dataDiv.node);
    contenedor.mainDiv.node.appendChild(contenedor.imgDiv.node);
    //contenedor.mainDiv.node.appendChild(contenedor.dataDiv.node);

    return contenedor;
}
;
