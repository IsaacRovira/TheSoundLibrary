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
 *</div>
 *  *  
 */

//Variable q recoge la estructura donde insertaremos las imágenes.
var imgContainer    ={
    mainDiv     :{        
        node        :   'div',
        clase       :   'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic',
        id          :   'id'
    },
    imgDiv      :{
        node        :   'div',
        clase       :   'col-12',
        onclick     :   '',
        onhover     :   ''
    },
    imgTag      :{
        node        :   'img',
        clase       :   'col-12',
        alt         :   '',
        src         :   ''
    },
    dataDiv     :{
        node        :   'div',        
        clase       :   'col-12'
    },
    hTag        :{
        node        :   'h4',        
        clase       :   ''   
    }
};

var PATH = "./img/Caratulas/";

var genImageMosaico = function(data){
    data = JSON.parse(data);    
        
    for(var i=0; i < data.length; i++){
        updateImgContainerValues(data);
        genNodes(imgContainer);
        buidlTheStructure(data);
    }
};

//**************************************
//FUNCIONES AUXILIARES
//**************************************

//Actualizar valores en imgContainer
function updateImgContainerValues(datos){
    for(var key in datos){
        switch(key){
            case 'discoId':
                imgContainer.mainDiv.id = datos[key];
                break;
            case 'album':
                imgContainer.imgTag.alt = datos[key];                
                break;
            case 'img_cover': 
                imgContainer.imgTag.src = datos[key];
                break;
        }
    }    
};

//Función de ayuda para meter todos los aributos asociados a un nodo.
function setAttributes(elemento){
    for(var key in elemento){
        if(key==='node'){
            elemento.node = document.createElement(elemento[key]);
        }else{
            elemento.node.setAttribute(key, elemento[key]);
    }
};

//Función de ayuda para generar los nodos con sus datos.
function genNodes(nodes){
    for(var key in nodes){
        setAttributes(nodes[key]);
    }    
};

function buidlTheStructure(datos){
    imgContainer.hTag.node   = document.createTextNode(datos['album']);
    imgContainer.dataDiv.appendChild(imgContainer.hTag.node);
    
    imgContainer.imgDiv.node.appendChild(imgContainer.imgTag);
    
    imgContainer.mainDiv.node.appendChild(imgContainer.imgDiv.node);
    imgContainer.mainDiv.node.appendChild(imgContainer.dataDiv);
};

/*
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <figure>
            <img src="../public/img/Caratulas/ACME.jpg" alt="ACME" class="img-fluid img-thumbnail">
            <figcaption>ACME - The John Spencer Blues Explosion</figcaption>
    </figure>
</div>
 */

/*
 var DIVCLASS = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic';

var divAttrb={
    id      : "id",
    class   : DIVCLASS,
    onclick : ""
};

var imgAttrb={
    fileName: "filename",
    path    : PATH,
    src     : "PATH",
    class   : "img-thumbnail rounded mx-auto d-block img-mosaic",
    alt     : "texto",
    width   : "225px"
};

var figcapAttrb={
    class: "lead small"
};

var divNode = document.createElement("div");
var figureNode = document.createElement("figure");
var imgNode = document.createElement("img");
var figcaptionNode = document.createElement("figcaption");

//Restablecer las variables para los elementos.
var resetNodes= function(){
    divNode = document.createElement("div");
    figureNode = document.createElement("figure");
    imgNode = document.createElement("img");
    figcaptionNode = document.createElement("figcaption");
};

//Modificar los atributos de los nodos div e img
var setAttrbNodes= function(id, fileName){
    divAttrb.id = id;
    imgAttrb.fileName = fileName;
    imgAttrb.alt = fileName;
    imgAttrb.src = PATH + fileName;
        
    divNode.setAttribute('id', divAttrb.id);
    divNode.setAttribute('class', divAttrb.class);
    
    
    imgNode.setAttribute('src', imgAttrb.src);
    imgNode.setAttribute('class', imgAttrb.class);
    imgNode.setAttribute('alt', imgAttrb.alt);
    imgNode.setAttribute('onclick', 'openDetails('+id+')');
    //imgNode.setAttribute('width', imgAttrb.width);
    
    figcaptionNode.setAttribute('class', figcapAttrb.class);
};

//Convinar los elementos antes de insertarlos.
var convineElements = function(valor){
    let text = document.createTextNode(valor);
    
    figcaptionNode.appendChild(text);
    
    figureNode.appendChild(imgNode);
    figureNode.appendChild(figcaptionNode);
    
    divNode.appendChild(figureNode);    
    
    return divNode;
};

var genImageMosaico = function(data){
    
   //alert(data);
    data = JSON.parse(data);
    
    for(let i = 0; i < data.length; i++){
        resetNodes();
        
        setAttrbNodes(data[i]['discoId'], data[i]['img_cover']);
        divNode = convineElements(data[i]['album']);
        document.getElementById('mainRow').appendChild(divNode);
    };
};
    */
//
