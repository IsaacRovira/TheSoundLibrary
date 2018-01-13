//contentGenerator.js
/*
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <figure>
            <img src="../public/img/Caratulas/ACME.jpg" alt="ACME" class="img-fluid img-thumbnail">
            <figcaption>ACME - The John Spencer Blues Explosion</figcaption>
    </figure>
</div>
 */

const DIVCLASS = "col-xs-12 col-sm-6 col-md-4 col-lg-3";
const PATH = "../public/img/Caratulas/";

let divAttrb={
    id      : "id",
    class   : DIVCLASS
};

let imgAttrb={
    fileName: "filename",
    path    : PATH,
    src     : "PATH",
    class   : "clase",
    alt     : "texto"
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


let lafuncion = function(data){
    
    //alert(data);
    data = JSON.parse(data);
    
    for(let i = 0; i < data.length; i++){
        resetNodes();      
        setAttrbNodes(data[i]['DiscoID'], data[i]['Img_cover']);        
        divNode = convineElements(data[i]['Album']);
        document.getElementById('laFila').appendChild(divNode);
    };
    /*
    let elemP = document.createElement("p");
    let elemT = document.createTextNode(data.length);

    elemP.appendChild(elemT);
    document.body.appendChild(elemP);
    document.getElementById('laFila').appendChild(elemP);
    */
};