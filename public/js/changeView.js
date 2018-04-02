//changeView.js

var esGeneral   = true;     //Define si mostraremos la base de datos general.
var esMosaico   = true;     //Define el modo de visión: mosaico o lista.

function removeElements(){
    var mainRowChild = document.getElementById('mainRow').childNodes;
    while(mainRowChild.length > 0){
        document.getElementById('mainRow').removeChild(mainRowChild[0]);
    }
};

function changeMode(data){
    removeElements();
    var childList =document.getElementById('modo').childNodes;
    if(esGeneral){
        if(esMosaico){			
            var text = document.createTextNode('Ir a Mosaico');
            document.getElementById('modo').replaceChild(text, childList[0]);
            esMosaico = false;
			//getAll(genImageList);
			genImageList(data);
            
        }else{
            var text = document.createTextNode('Ir a Lista');
            document.getElementById('modo').replaceChild(text, childList[0]);
            esMosaico = true;
            //getAll(genImageMosaico);
			genImageMosaico(data);   
        }
    }else{
        if(esMosaico){
            var text = document.createTextNode('Ir a Mosaico');
            document.getElementById('modo').replaceChild(text, childList[0]);
            esMosaico = false;
            //getAll(genImageList);
			genImageList(data);
        }else{
            var text = document.createTextNode('Ir a Lista');
            document.getElementById('modo').replaceChild(text, childList[0]);
            esMosaico = true;
            //getAll(genImageMosaico);
			genImageMosaico(data);
			}
	}
};

function changeEstado(){
    var childList =document.getElementById('estado').childNodes;
    var node = document.createElement('h3');    
    if(esGeneral){
        var text = document.createTextNode("TU FONOTECA");
        node.appendChild(text);
        document.getElementById('estado').replaceChild(node, childList[0]);
        esGeneral=false;
        //reloadAll();
    }else{
        var text = document.createTextNode("FONOTECA");
        node.appendChild(text);
        document.getElementById('estado').replaceChild(node, childList[0]);
        esGeneral = true;
        //reloadAll();
    }    
};

function test(){
    alert("funcion");
}


