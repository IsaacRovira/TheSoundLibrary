/* 
 * Cambia el main.html para mostrar el modo Añadir albumes.
 * Estomo modo consultara la base de datos de DISCOG y mostrara los resultados
 * agrupados en un número configurable por página.
 * 
 * Pasos:
 * 1-Cambia el subtitulo para indicar el modo en el que nos encotnramos.
 * 2-Cambia el menú de navegación para mostrar las funciones asociadas a este modo.
 *  2.1-Buscar
 *  2.2-ModoFonoteca (volver a la fonoteca)
 *  2.3-Configurar (el modo Añadir)
 * 3-Añade un pie de página q mostrara el total de páginas que ha retornado la búsqueda, la página actual y un menú de navegación por la búsqueda. * 
 */


//Cambiar el subtitulo y la variable currentMode que recoge el modo en el que nos encontramos.
var subtituloValor = ['Fonoteca','Añadir','navPosition'];
commonData.currentMode.set(subtituloValor);

//Generar un pie de página.
//5 subelementos FIRST, BACK, INFO, NEXT, LAST
function elementNew(t,c,i,f,ch){
    return {
        tag:    t,
        class:  c,
        id:     i,
        onclick:f,
        child:  ch
    };
}
;
//Estructura textElement INFO
var textElementPropeties={
    class:  "",
    id:     "footInfoElement"
}
;
//Estructura subElementos del foot.
var footChildElements={
    first:  elementNew('i','fas fa-angle-double-left', 'first','toFirst()' ,[]),//<i class="fas fa-angle-double-left"></i>
    prev:   elementNew('i','fas fa-angle-left', 'prev','oneBack()' ,[]),//<i class="fas fa-angle-left"></i>
    info:   elementNew('i','icono', 'pageInfo','' ,[]),
    next:   elementNew('i','fas fa-angle-right', 'next','oneFoward()' ,[]),//<i class="fas fa-angle-right"></i>
    last:   elementNew('i','fas fa-angle-double-right', 'last','toLast()',[]) //<i class="fas fa-angle-double-right"></i>
}
;
//Estructura principal del foot
var footerStruct={
    tag:    "div",
    class:  "footer",
    id:     "footMenu",
    child:[
        footChildElements.first,
        footChildElements.prev,
        footChildElements.info,
        footChildElements.next,
        footChildElements.last
    ]
}
;
//Recorre la estructura q representa los nodos y devuleve el elemento node representado.
function generarNode(nodeStruct){
    var newNode;
    for(var key in nodeStruct){
        switch(key){
            case 'child':
                for(var item in nodeStruct[key]){
                    newNode.appendChild(generarNode(nodeStruct[key][item]));
                }                
                break;
            case 'tag':
                newNode = document.createElement(nodeStruct[key]);
                break;
            default:
                newNode.setAttribute(key, nodeStruct[key]);
                break;
        }
    }
    return newNode;
}
;
//Funciones del pie de página
function toFirst(){
    doQueryDiscogsAlbums2(commonData.url.get().std.discog.discos,commonData.datosDiscogAlbums['pagination']['urls']['first'],commonData.datosDiscogAlbums.set());  
}
;
function oneBack(){
    doQueryDiscogsAlbums2(commonData.url.get().std.discog.discos,commonData.datosDiscogAlbums['pagination']['urls']['prev'],commonData.datosDiscogAlbums.set());
}
;
function oneFoward(){
    doQueryDiscogsAlbums2(commonData.url.get().std.discog.discos,commonData.datosDiscogAlbums['pagination']['urls']['next'],commonData.datosDiscogAlbums.set());
}
;
function toLast(){
    doQueryDiscogsAlbums2(commonData.url.get().std.discog.discos,commonData.datosDiscogAlbums['pagination']['urls']['last'],commonData.datosDiscogAlbums.set());
}
;

//Crea un nuevo pie de página
function newFootNode(){
    var newNode = generarNode(footerStruct);
    var oldNode = document.getElementById(footerStruct.id);
    
    document.getElementsByTagName('body')[0].replaceChild(newNode,oldNode);
}
;
//Funciones aux pie de página.
function updateFootInfo(){
    var pag = 0;
    var maxpag = 0;
    if(checkPagination()){
        pag = commonData.datosDiscogAlbums['pagination']['page']; //Página actual
        maxpag = commonData.datosDiscogAlbums['pagination']['pages']; //Total páginas en la consulta
    }    
    document.getElementById(footChildElements.info.id).textContent = pag + "/" + maxpag; 
}
;
//Actualiza los elementos del footer
function updateFootState(){
    if(checkPagination()){
        for(var key in footChildElements){
            switch(key){
                default:
                    var oldNode = document.getElementById(key);
                    var newNode;
                    if(key in commonData.datosDiscogAlbums['pagination']['urls']){
                        newNode = generarNode(footChildElements[key]);
                    }else{
                        newNode = generarNode(elementNew('i','',key,'',[]));
                    }
                    document.getElementById(footerStruct.id).newreplaceChild(newNode,oldNode);
                    break;
                case 'info':
                    updateFootInfo();
                    break;
            }
        }        
    }else{
        for(var key in footChildElements){
            var oldNode = document.getElementById(key);
            var newNode;
            switch(key){
                case 'info':
                    updateFootInfo();
                    break;
                default:
                    newNode = generarNode(elementNew('i','',key,'',[]));
                    document.getElementById(footerStruct.id).replaceChild(newNode, oldNode);
            }            
        }
    }
}
;
//Verifica q existe el elemento paginación. Utilizado en UpdateFootState.
function checkPagination(){
    if(commonData.datosDiscogAlbums != null){
        if('pagination' in commonData.datosDiscogAlbums){
            if('urls' in commonData.datosDiscogAlbums.pagination){
                return true;
            }
        }
    }
    return false;
}
;
//Carga la vista addView cuando se accede desde fonoteca.
function loadAddView(){    
    commonData.currentMode.set('Añadir');//Cambiamos el estado de la variable q indica el modo en el q nos encotnramos.    
    textChange('Fonoteca', 'Añadir', 'navPosition');//Cambiamos el subtitulo a Base de datos
    removeElements();//Vaciamos el mainRow.
    newFootNode();
    updateFootState();//actualizamos el pie de página.
    
    console.log(commonData.url.get().std.discog.discos);
    console.log("https://api.discogs.com/database/search?title=back to black&type=release&per_page=3&page=1");
    
    doQueryDiscogAlbum2(commonData.url.get().std.discog.discos,"https://api.discogs.com/database/search?title=back to black&type=release&per_page=9&page=1",commonData.datosDiscogAlbums.set);
    //https://api.discogs.com/database/search?title=back to black&type=release&per_page=3&page=1
    
    //Recuperamos la última búsqueda?????    
    //No mostramos nada y abrimos el menu de Busqueda ocupando todo el contenedor.
    //openSearchMenu();
    
    //Actualizamos el menu de Navegación.
}
;
//Actualiza la vista addView con el resultado de las búsquedas.
function updateAddView(data){
    removeElements();//Vaciamos el mainRow.
    updateFootState();//actualizamos el pie de página.    
    var datos = convertAlbumResults(data);
    commonData.datosDiscos.set(JSON.stringify(datos));
}
;
//Transforma los resultados recibidos de discog al formato q aceptan otras funciones.
function convertAlbumResults(datos){    
    var newData = [];    
    datos['results'].forEach(function(result){        
        var obj = {
            discoID:    result['id'],
            album:      result['title'],
            cover_image:  encodeURI(result['cover_image'])
        };
        newData.push(obj);
    });    
    return newData;
}
;