//menuFunctions.js
var openSubMenus = {
    'search-form':     false,
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
                document.getElementById(id).style.height = "45px";
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
}
;
//Buscar
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
function openOrderBy(){
    var id = "orderBy-form";
    width = document.getElementById(id).offsetWidth;
    if(width > 0){
        document.getElementById(id).style.width = "0";
    }else{
        closeSubMenus();
        document.getElementById(id).style.width = "150px";
        openSubMenus[id] = true;
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
    alert("FUNCIÓN NO DISPONIBLE TODAVÍA.")    
}
;

//Pictures error
function getAltPic(id){
    document.getElementById(id).setAttribute('src', './img/Caratulas/nopic.jpg');
}
