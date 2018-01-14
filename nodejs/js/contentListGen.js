//contentListGen.js

//Genera un listado con la consulta devuelta.

//Estructura de referencia
/*
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

//const PATH = "../public/img/Caratulas/";

let imgAtt={
    fileName: "filename",
    path    : PATH,
    src     : "PATH",
    class   : "img-list",
    alt     : "texto",
    width   : "225px"
};

let liAtt={
    class   : 'list-group-item',
    id      : 'discoID',
    onclick : 'test()'
};

let pText={
    album   : 'album',
    artista : 'artista',
    sello   : 'discografica',
    year    : 'year',
    genero  : 'genero',
    class   : 'list-info'
};

let colClass = {
    img     : 'col-3',
    txt     : 'col-9'
}

let genLiNode = function(valor){
    let liNode = document.createElement('li');
    liNode.setAttribute('class', valor.class);
    liNode.setAttribute('id', valor.id);
    liNode.setAttribute('onclick', valor.onclick);
    
    return liNode;
};

let genPNode = function(valor){
    let pNode = document.createElement('p');
    pNode.setAttribute('class', pText.class);
    pNode.appendChild(document.createTextNode(valor));
    return pNode;
};

let genDivColNode=function(valor){
    let divColNode = document.createElement('div');
    divColNode.setAttribute('class', colClass.txt);
    divColNode.appendChild(genPNode(valor.album));
    divColNode.appendChild(genPNode(valor.artista));
    divColNode.appendChild(genPNode(valor.genero));
    
    return divColNode;
};

let genDivColNodeOne=function(valor){
    let divColNode = document.createElement('div');
    divColNode.setAttribute('class', colClass.txt);
    divColNode.appendChild(genPNode(valor.album));
    
    return divColNode;
}

/*
let listTextStructure = function(valor1, valor2, valor3){
    let divRowNode = document.createElement('div');
    divRowNode.setAttribute('class', 'row');
    
    divRowNode.appendChild(genDivColNode(valor1, valor2, valor3));
    
    return divRowNode;
}
*/
let genImgNode = function(data){
    let img_Node = document.createElement('img');
    img_Node.setAttribute('class', data.class);
    img_Node.setAttribute('alt', data.alt);
    img_Node.setAttribute('src', data.src);
    
    return img_Node;
};

let genRowColNode=function(texto,data){
    let divRowNode = document.createElement('div');
    divRowNode.setAttribute('class', 'row');
    
    let divColNode = document.createElement('div');    
    divColNode.setAttribute('class', colClass.img);
    divColNode.appendChild(genImgNode(data));
    divRowNode.appendChild(divColNode);
    
    divRowNode.appendChild(genDivColNode(texto));
    
    return divRowNode;
};

let altValue = function(valorOrg,valorAlt){
    if(valorOrg === undefined) return valorAlt;
    return valorOrg;
}

let genImageList = function(data){
    //alert(data);    
    data = JSON.parse(data);
    
    let ulNode = document.createElement('ul');
    ulNode.setAttribute('class', 'list-group');
    
    for(let i = 0; i < data.length; i++){
        liAtt.id = data[i]['DiscoID'];
        
        imgAtt.src        = PATH + data[i]['Img_cover'];
        imgAtt.alt        = data[i]['Album'];
        imgAtt.fileName   = data[i]['Img_cover'];
        
        pText.album         = 'Album: ' + data[i]['Album'];
        pText.artista       = 'Artista: ' + altValue(data[i]['Artista'],'----');
        pText.sello         = 'Sello: ' + altValue(data[i]['sello'], '----');
        pText.year          = 'Ano: ' + altValue(data[i]['año'], '----');
        pText.genero        = 'Genero: ' + altValue(data[i]['genero'], '----');
        
        let liNode = genLiNode(liAtt)
            liNode.appendChild(genRowColNode(pText, imgAtt));
        ulNode.appendChild(liNode);
    }
    document.getElementById('mainRow').appendChild(ulNode);
};