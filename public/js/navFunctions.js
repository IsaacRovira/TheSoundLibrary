//menuFunctions.js
var openSubMenus = {
    'search-form':     false,
    'orderBy-form':   false
};

//Mostrar/Ocultar ventana del menú lateral
function openNav() {
    width = document.getElementById("sideMenu").offsetHeight;
    if(width > 0){
        closeSubMenus();
        document.getElementById("sideMenu").style.height = "0";        
    }else{
        document.getElementById("sideMenu").style.height = "250px";
    }                
}
;
/*Refrescar contenido
 * Volver a consultar la base de datos y acutlaizar el contenido mostrado según el modo seleccionado, lista o mosaico
 */
function refreshData(){
    doQueryAll(commonData.url.get()['std']['general']['discos'], commonData.datosDiscos.set);
}
;
/*Buscar*/
function openSearch(){
    var id = "search-form";
    width = document.getElementById(id).offsetWidth;
    if(width > 0){
        document.getElementById(id).style.width = "0";        
    }else{
        closeSubMenus();
        document.getElementById(id).style.width = "175px";
        openSubMenus[id] = true;
    }        
}
;
//busca discos q coincidan con los criterios.
function searchAlbum(){
    var elements = document.getElementById('formSearchAlbum').elements;
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
    //alert(JSON.stringify(dataToSearch));
    
    doQuerySearch(commonData.url.get()['std']['general']['discos'], dataToSearch, commonData.datosDiscos.set);
    openSearch();
}
;
//Busca discos q contengan canciones q conincidan con los criterios.
function searchSong(){
    
}
;
/*Ordenar*/
function openOrderBy(){
    var id = "orderBy-form";
    width = document.getElementById(id).offsetWidth;
    if(width > 0){
        document.getElementById(id).style.width = "0";        
    }else{
        closeSubMenus();
        document.getElementById(id).style.width = "175px";
        openSubMenus[id] = true;
    }
}
;
function orderBy(){}
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
    alert("FUNCIÓN NO DISPONIBLE TODAVÍA.")    
}
;
