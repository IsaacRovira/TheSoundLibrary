//contentGenerator.js
/*
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <figure>
            <img src="../public/img/Caratulas/ACME.jpg" alt="ACME" class="img-fluid img-thumbnail">
            <figcaption>ACME - The John Spencer Blues Explosion</figcaption>
    </figure>
</div>
 */


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
        node        :   'node',
        clase       :   'clase',
        id          :   'id',
        metodo1     :   'metodo1',
        metodo2     :   'metodo2'
    },
    imgDiv      :{
        node        :   'node',
        clase       :   'clase',
        id          :   'id',
        metodo1     :   'metodo1',
        metodo2     :   'metodo2'
    },
    imgTag      :{
        node        :   'node',
        clase       :   'clase',
        id          :   'id',
        alt         :   'alt',
        src         :   'src',
        metodo1     :   'metodo1',
        metodo2     :   'metodo2'        
    },
    dataDiv     :{
        node        :   'node',        
        clase       :   'clase',
        id          :   'id',
        metodo1     :   'metodo1',
        metodo2     :   'metodo2'
    },
    hTag        :{
        node        :   'node',        
        clase       :   'clase',
        id          :   'id',
        metodo1     :   'metodo1',
        metodo2     :   'metodo2'        
    }
};


alert(imgContainer.mainDiv.class)
alert(imgContainer.imgDiv.class);
imgContainer.mainDiv.class = 'mainDivClass';
alert(imgContainer.mainDiv.class)
alert(imgContainer.imgDiv.class);



var DIVCLASS = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic';
var PATH = "./img/Caratulas/";

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

let divNode = document.createElement("div");
let figureNode = document.createElement("figure");
let imgNode = document.createElement("img");
let figcaptionNode = document.createElement("figcaption");

//Restablecer las variables para los elementos.
let resetNodes= function(){
    divNode = document.createElement("div");
    figureNode = document.createElement("figure");
    imgNode = document.createElement("img");
    figcaptionNode = document.createElement("figcaption");
};

//Modificar los atributos de los nodos div e img
let setAttrbNodes= function(id, fileName){
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
let convineElements = function(valor){
    let text = document.createTextNode(valor);
    
    figcaptionNode.appendChild(text);
    
    figureNode.appendChild(imgNode);
    figureNode.appendChild(figcaptionNode);
    
    divNode.appendChild(figureNode);    
    
    return divNode;
};

let genImageMosaico = function(data){
    
   //alert(data);
    data = JSON.parse(data);
    
    for(let i = 0; i < data.length; i++){
        resetNodes();        
        setAttrbNodes(data[i]['discoId'], data[i]['img_cover']);        
        divNode = convineElements(data[i]['album']);
        document.getElementById('mainRow').appendChild(divNode);
    };
};



