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

var idActivo = '';

function test(id){
    //alert(id);
    var clase1  = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic';
    var clase2  = 'col-6';
    var valor   = document.getElementById(id).getAttribute('class');
    
    switch(valor){
        
        case clase1:
            document.getElementById(id).setAttribute('class', clase2);
            doQuerySongsByAlbum('http://127.0.0.1/canciones', id, showData);
            break;
            
        case clase2:           
            document.getElementById(id).setAttribute('class', clase1);
            break;
    }
};

function showData(data){
    var data = JSON.parse(data);
    for(var i=0; i < data.length; i++){
        for(var key in data[i]){
            alert(data[i][key]);
        }        
    }
};
