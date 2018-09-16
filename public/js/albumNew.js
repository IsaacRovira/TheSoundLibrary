/*  
 * albumNew.js
 */


function clickOnAdd(valor){
    commonData.currentMode = valor;
    refreshData(valor);
    changeNode(valor);
    switch(valor){
        case 'add':
            doQueryAll(urlSettings.std.general.discos, commonData.datosDiscos.set);
            break;
        case 'check':
            doQueryAll(urlSettings.std.fonotecas.discos, commonData.datosDiscos.set);
            break;
    }    
}

function changeNode(valor){
    switch(commonData.currentMode){
        case 'add':
            document.getElementById('sideMenu-h').childNodes[5].setAttribute('onclick', 'clickOnAdd("check")');
            document.getElementById('sideMenu-h').childNodes[5].textContent = "Fonoteca";            
            break;
        case 'check':
            document.getElementById('sideMenu-h').childNodes[5].setAttribute('onclick', 'clickOnAdd("add")');
            document.getElementById('sideMenu-h').childNodes[5].textContent = "Añadir";
            break;
    }
}
;