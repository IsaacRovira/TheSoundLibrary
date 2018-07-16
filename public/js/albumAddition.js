/*
 * albumAddtion.js
 */

/*DISCOGS API DATA*
 * 
 *https://api.discogs.com/database/search?q={back to black, Amy Winehouse, soul,release}&{?title,artist,genere,type}
 *Header: Authorization: Discogs token=SdnGXnFwzcWVCMUhDmuumAZJOdCkpCcVGNApmdju
 *
 *--user-agent TheSoundLibrary/1.0 +http://thesoundlibrary.com
 */

var discogs={
    url             : "https://api.discogs.com/database/search",
    header          :{
        header      :"authorization",
        value       : "Discogs token=SdnGXnFwzcWVCMUhDmuumAZJOdCkpCcVGNApmdju"
    },    
    appinfo         :{
        name        : "TheSoundLibrary/1.0 +http://thesoundlibrary.com",
        type        : "user-agent"
    },
    pagination      :{
        per_page    :25,
        page        :1
    }
}
;

/*
 * Debe generar una cadena tipo: {back to black, Amy Winehouse, soul,release}&{?title,artist,genere,type}
 * con los datos del formulario.
 * Identificaremos que datos se han introducido y construiremos la cadena.
 */
function doSearch(){
    //almacenamos el contenido del formulario
    var elements = document.getElementById('searchFormAddition').elements;
    //Estructura para almacenar los valores del formulario.
    var dataToSearch={
        artist          : "",
        label           : "",
        release_title   : "",
        style           : "",
        genre           : "",
        format          : "",
        country         : "",
        barcode         : "",
        year            : ""        
    };
    
    //Cadenas de valores y parámetros.
    var searchValues =""; //Valores a buscar    
    
    //Recorremos el objeto elements con los datos del formulario
    for(var key in dataToSearch){
        dataToSearch[key] = elements[key].value;
    }
    
    for(var key in dataToSearch){
        if(dataToSearch[key]){
            if(searchValues.length > 0){
                searchValues+="&" + key + '='+ dataToSearch[key];                
            }else{
                searchValues+=key + "=" + dataToSearch[key];                
            }
        }
    }
    
    //paginación
    var pagination ='&per_page='+discogs['pagination']['per_page']+'&page='+discogs['pagination']['page'];
    
    
    alert(searchValues);
    queryDiscogs(discogs['url'],searchValues, pagination, testResponse);
}
;
function queryDiscogs(destino, valores, param, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {        
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
        if (this.status === 401){
            alert("ACCESO NO AUTORIZADO");
        }
        //alert(this.status);
    };
    
    //https://api.discogs.com/database/search?q={back to black, Amy Winehouse, soul,release}&{?title,artist,genere,type}
    alert(destino+'?' + valores + param);
    xhttp.open("GET", destino + '?' + valores + param, true);
    xhttp.setRequestHeader(discogs['appinfo']['type'], discogs['appinfo']['name']);
    xhttp.setRequestHeader(discogs['header']['header'], discogs['header']['value']);
    xhttp.send();
}
;
function testResponse(valor){    
    data = JSON.parse(valor);  
    var nodeUL = document.createElement('ul');
    nodeUL.setAttribute('id','lista');
    alert(data['pagination']['items']);    
    for(var num = 0; num < data['results'].length; num ++){
        var nodeLI = document.createElement('li');
        for(var key in data['results'][num]){       
            switch(key){
                case 'style':
                case 'format':
                case 'label':
                case 'barcode':
                case 'genre':
                    var nodeP = document.createElement('p');
                    var nodeTXT = document.createTextNode(key + ": "+ getString(data['results'][num][key]));
                    nodeP.appendChild(nodeTXT);
                    nodeLI.appendChild(nodeP);
                    break;
                case 'title':
                    //Artista
                    var nodeP = document.createElement('p');
                    var nodeTXT = document.createTextNode('Artist' + ": "+ data['results'][num][key].split(' - ')[0]);
                    nodeP.appendChild(nodeTXT);
                    nodeLI.appendChild(nodeP);
                    //Titulo
                    var nodeP = document.createElement('p');
                    var nodeTXT = document.createTextNode('Title' + ": "+ data['results'][num][key].split(' - ')[1]);
                    nodeP.appendChild(nodeTXT);
                    nodeLI.appendChild(nodeP);
                    break;
                case 'id':
                case 'type':
                case 'artist':
                case 'year':            
                case 'country':
                    var nodeP = document.createElement('p');
                    var nodeTXT = document.createTextNode(key + ": "+ data['results'][num][key]);
                    nodeP.appendChild(nodeTXT);
                    nodeLI.appendChild(nodeP);                    
                    break;
            }
            nodeUL.appendChild(nodeLI);
        }
    }
    //removeNode = document.getElementById('lista');
    document.getElementById('lista').remove();
    document.getElementById('mainContainer').appendChild(nodeUL);
}
;
function basicNodeStruct(tag, id, clase, valor){
    var node = document.createElement(tag);
    
    if(id){node.setAttribute('id', id);}
    if(clase){node.setAttribute('class', clase);}
    
    if(valor){
        var txt = document.createTextNode(valor);
        node.appendChild(txt);
    }
    return node;
}
;
function imgNodeStruct(tag, id, clase, src){
    var node = document.createElement('tag');
    
    if(id){node.setAttribute('id', id);}
    if(clase){node.setAttribute('class', clase);}
    
    node.setAttribute('src', src);
    
    return node;
}
;
function imgStruct(tag, id, clase, src){
    var node ={
        node    : tag,
        id      : id,
        class   : clase,
        src     : src
    };
    return node;
}
;
function textDivStruct(tag,id,clase){
    var node ={
        node : tag,
        id   : id,
        class: clase
    };
    return node;
}
;
var itemStruct ={
    itemDiv:{
        tag    :  'div',
        id      :  '',
        class   :  'itemDiv',
        childs  :{
            imgDiv:{
                node    : 'div',
                id      : '',
                class   : 'imgDiv',
                childs  :{
                    img : imgStruct('img', '', 'imgFrame', '')
                }
            },
            txtDiv:{
                node: 'div',
                id  : '',
                class: 'mainDataText',
                childs:{
                    title  : textDivStruct('div','','textDiv titulo'),
                    artist : textDivStruct('div','','textDiv'),
                    year    : textDivStruct('div','','textDiv'),
                    country : textDivStruct('div','','textDiv'),
                    catno   : textDivStruct('div','','textDiv')
                }
            },
            dataDiv:{
                node: 'div',
                id  : '',
                class: 'dataDiv',
                childs:{
                    barcode : textDivStruct('div', '', 'textDiv'),
                    label   : textDivStruct('div', '', 'textDiv'),
                    style   : textDivStruct('div', '', 'textDiv'),
                    genre  : textDivStruct('div', '', 'textDiv'),
                    format  : textDivStruct('div', '', 'textDiv')
                }
            }
        }        
    }
}
;
function genNode(object, valor){
    switch(object['node']){
        case 'img':
            var node = imgNodeStruct(object['node'], object['id'],object['class'], valor['src']);
            break;
        default:
            var node = basicNodeStruct(object['node'], object['id'], object['class'], valor);
    }
    if(object['childs']){        
        for(var key in object['childs']){
            var txt = '';
            switch(key){
                case 'title':
                case 'artist':
                case 'year':
                case 'country':
                case 'catno':
                case 'barcode':
                case 'label':
                case 'style':
                case 'genre':
                case 'format':                
                    txt= tagNames[key]+tagNames['separador'] + valor[key];
                    break;
                default:
                    txt = valor['empty'];
            }
            var nodeChild = genNode(object['childs'][key], txt);
            node.appendChild(nodeChild);
        }    
    }
    return node;
}
;
var tagNames={
        title   : 'Título',
        artis   : 'Artista',
        year    : 'Año',
        country : 'País',
        catno   : 'Núm.Cat',
        barcode : 'Código de barras',
        label   : 'Etiquetado',
        style   : 'Estilos',
        genre   : 'Géneros',
        format  : 'Soportes',
        separador: ': '
}
;
function albumData(src, title, artist, year, country, catno, barcode, label, style, genre, format){
    var data={
        src     : src,
        title   : title,
        artis   : artist,
        year    : year,
        country : country,
        catno   : catno,
        barcode : getString(barcode),
        label   : getString(label),
        style   : getString(style),
        genre   : getString(genre),
        format  : getString(format),
        empty   : ''
    };
    return data;
}
;
function getString(data){
    var cadena='';
    for(var key in data){
        if(cadena.length > 0){
            cadena+=', '+data[key];
        }else{
            cadena=data[key];
        }        
    }
    return cadena;
}
;