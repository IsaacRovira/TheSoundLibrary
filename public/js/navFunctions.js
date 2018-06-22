//menuFunctions.js
var openSubMenus = {
    'div-search-form':     false,
    'orderBy-form':   false
};

//Mostrar/Ocultar ventana del menú lateral
function openNav() {
    var id = "sideMenu";
    
    if(screen.width >=768){
        id = "sideMenu-h";
    }
    
    var height = document.getElementById(id).offsetHeight;
    if(height > 0){
        closeSubMenus();
        document.getElementById(id).style.height = "0";        
    }else{
        switch(id){
            case "sideMenu-h":
                document.getElementById(id).style.height = "3vw";
                break;
            case "sideMenu":
                document.getElementById(id).style.height = "275px";
                break;
        }        
    }          
}
;
//Refrescar contenido
 /* Volver a consultar la base de datos y acutlaizar el contenido mostrado según el modo seleccionado, lista o mosaico*/
function refreshData(){    
    doQueryAll(commonData.url.get()['std']['general']['discos'], commonData.datosDiscos.set);
    commonData.dataToSearch.set({});
    commonData.orderByField.set('discoId');
    closeSubMenus();
    openNav();
}
;
//Buscar
function openSearch(nodeId){
    var id = "formSearch";
    var pos = document.getElementById(nodeId).getBoundingClientRect();
    var height = document.getElementById(id).offsetHeight;
    
    switch(nodeId){
        case 'h-search':
            closeIconOnOff('Buscar', nodeId);
                if(height > 6){
                    document.getElementById(id).style.height = "0";
                    document.getElementById(nodeId).setAttribute('class', "menu-h-item col-1");
                }else{        
                    closeSubMenus();
                    document.getElementById(nodeId).setAttribute('class', 'menu-h-item selected col-1');
                    //Establecer la posición y el ancho respecto al menu BUSCAR.
                    //document.getElementById(id).style.top = pos.bottom + "px";
                    //document.getElementById(id).style.left = pos.left + "px";        
                    //document.getElementById(id).style.width = "16vw";
                    //Definir el alto para que el menú sea visible.
                    //document.getElementById(id).style.height = "28vw";
                    setPosnSize(pos.bottom, pos.left, 16, 28, id);
                    openSubMenus[id] = true;
                }
            break;
        case 'v-search':
            if(true){}
            break;
    }
}
;
//Determina la posición altura y ancho de un objeto dado. Posición en px y tamaño en vw.
function setPosnSize(t,l,w,h,id){
    document.getElementById(id).style.top = t + "px";
    document.getElementById(id).style.left = l + "px";
    document.getElementById(id).style.width = w + "vw";
    document.getElementById(id).style.height = h + "vw";
}
;
//Devuelve un nodo con los atributos pasados.
function createNode(tag, clase, id){
    var node = document.createElement(tag);
    node.setAttribute('class', clase);
    node.setAttribute('id', id);
    return node;
}
;
//Remplaza en el elemento indicado el texto por el elemento <i class="fas fa-times"></i> y viceversa.
function closeIconOnOff(text,id){   
    var valor = document.getElementById(id).textContent;    
    switch(valor){
        case text:            
            document.getElementById(id).textContent='';
            var newNode = createNode('i','fas fa-times', 'h-sidenav-close-btn');//<i class="fas fa-times"></i>
            //newNode.setAttribute('onclick', openSearch(id));
            document.getElementById(id).insertBefore(newNode, null);            
            break;
        default:            
            document.getElementById(id).removeChild(document.getElementById('h-sidenav-close-btn'));            
            document.getElementById(id).textContent = text;
    }
}
;
//busca discos q coincidan con los criterios.
function searchAlbum(){
    var elements = document.getElementById('formSearch').elements;
    var dataToSearch={};
    
    for(var key in elements){
        switch(elements[key].value){
            case 'Album':
            case 'Artista':
            case 'Año':
            case 'Genero':
            case 'Cancion':
                break;
            default:
                if(elements[key].value) dataToSearch[elements[key].name] = elements[key].value;
        }
    }
    commonData.dataToSearch.set(dataToSearch);
    //alert(JSON.stringify(dataToSearch));
    
    doQuerySearch(commonData.url.get()['std']['general']['discos'], dataToSearch, 0, commonData.orderByField.get(), commonData.datosDiscos.set);
    openSearch();
}
;
//Busca canciones q conincidan con los criterios. (Secundario)
function searchSong(){
    
}
;
//Ordenar
function openOrderBy(nodeId){    
    closeSubMenus(); //Cerramos cualquier otro submenu abierto.
    
    switch(nodeId){ //Determinamos desde que menú han llamado a la función.
        case 'h-orderby':
            var id = "formFilter";
            var heigh = document.getElementById(id);
            if(heigh > 0){
                document.getElementById(id).style.height = 0;
                document.getElementById(id).style.width = 0;
            }else{
                //Determinamos la pos del objeto que lo ha llamado para posicionar nuestro menú justo debajo.
                var pos = document.getElementById(nodeId).getBoundingClientRect();
                //Modificamos la clase del elemento que ha llamado a la función.
                document.getElementById(nodeId).setAttribute('class', 'menu-h-item selected col-1');
                //Establecemos la posición y el ancho de nuestro submenu.
                setPosnSize(pos.bottom, pos.left, 17, 18, id);
                //Mostramos el elmento q cerrará el menú.
                closeIconOnOff('Ordenar', nodeId);
                openSubMenus[id] = true;                
            }
            break;
        case 'v-orederby':
            var id = "orderBy-form";
            width = document.getElementById(id).offsetWidth;
            if(width > 0){
                document.getElementById(id).style.width = "0";
            }else{
                closeSubMenus();
                document.getElementById(id).style.width = "150px";
                openSubMenus[id] = true;
            }
            break;                        
    }
}
;
function orderBy(){    
    var valor = document.getElementById('select-orderBy').value;
    commonData.orderByField.set(valor);
    //alert(valor);
    //alert(JSON.stringify(commonData.dataToSearch.get()));
    doQuerySearch(commonData.url.get()['std']['general']['discos'],commonData.dataToSearch.get(), 0, valor, commonData.datosDiscos.set);
    document.getElementById("orderBy-form").style.width = "0";
}
;

/*Cerrar menús*/
function closeSubMenus(){
    for(var key in openSubMenus){
        if(openSubMenus[key]){
            document.getElementById(key).style.width = "0";
            openSubMenus[key]=false;
        }
    }
}
;
/*Working*/
function working(){
    alert("FUNCIÓN NO DISPONIBLE TODAVÍA.");
}
;

//ONSELECT SEARCH
function cleanTextOnSelect(id){
    var attrb = document.getElementById(id).getAttribute('value');
    switch(attrb){
        case 'Album':
        case 'Artista':
        case 'Año':
        case 'Genero':
        case 'Canción':
            document.getElementById(id).setAttribute('value', '');
        break;
        default:            
    }
}
;
//Pictures error
function getAltPic(id){
    document.getElementById(id).setAttribute('src', './img/Caratulas/nopic.jpg');
}
