//contentGenerator.js

/*NUEVA ESTRUCTURA*/
/* 
 * Generar struct q reproduza esta estructura.
 *  
 * <div class="col-lo q toque" id="id del album">
 *  <div class="col-12">
 *      <img onclick="mostrar detalles" alt="nombre album" src="foto">
 *  <div>
 *  <div class="col-12 datos_img"> 
 *      <h4>Titulo del Album</h4>
 *  </div>
 * </div>
 *  
 */

let imgContainer    = {
    mainDiv     :{        
        node        :   'div',
        clase       :   'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic',
        id          :   'id'
    },
    imgDiv      :{
        node        :   'div',
        clase       :   'col-12',
        onclick     :   'test()',
        onhover     :   'test()'
    },
    imgTag      :{
        node        :   'img',
        clase       :   'col-12',
        alt         :   '',
        src         :   ''
    },
    dataDiv     :{
        node        :   'div',        
        clase       :   'col-12'
    },
    hTag        :{
        node        :   'h4',        
        clase       :   ''   
    }
};

var imgContainerVar = imgContainer;

var genImageMosaico = function(data){
	alert(data);
    data = JSON.parse(data);
	let n = 0;	
	
    for(var i = 0; i < data.length; i++){
		alert(i + ' ' + data[i]['discoId']);
		showImgContainer(imgContainerVar);
		updateImgContainerValues(data[i], imgContainerVar); 
		genNodes(imgContainerVar);
		showImgContainer(imgContainerVar);
		
		//buildTheStructure(data[i]);
		
		//document.getElementById('mainRow').appendChild(imgContainer.mainDiv.node);
		n++;
		imgContainerVar = imgContainer;
	}
	alert(n);
};

//**************************************
//FUNCIONES AUXILIARES
//**************************************

function showImgContainer(org){
	dest = org;
	for(var key in org){
		for(var item in key){
			alert(key +'-'+item +' : '+ key[item]);
		}
	}
};

//Actualizar valores en imgContainer
function updateImgContainerValues(datos, container){	    
	for(var key in datos){
        switch(key){
            case 'discoId':				
                container.mainDiv.id = datos[key];
                break;
            case 'album':                
				container.imgTag.alt = datos[key];                
                break;
            case 'img_cover': 
                container.imgTag.src = datos[key];
                break;
        }
    }
};

/*Genera los nodos en el campo nodo de cada elemento de imgContainer
según el valor del elemento node dentro de imgContainer y establace los atributos en el nodo creado según los valores de los atributos de imgContainer.
*/
function setAttributes(elemento){
    for(var key in elemento){
        switch(key){
			case 'node':				
				elemento.node = document.createElement(elemento[key]);
				break;
			default:				
				elemento.node.setAttribute(key, elemento[key]);
				break;
		}
	}    
};

//Recorre los elementos de "imgContainer" y aplica cada subelemento node los atributos definidos para ese elemento en "imgContainer".
function genNodes(nodes){
    for(var key in nodes){
		alert(key);
        setAttributes(nodes[key]);
    }
};

function buildTheStructure(datos){    
	alert('htag');
	imgContainer.hTag.node = document.createTextNode(datos['album']);
	alert('appendChild dataDiv');
	imgContainer.dataDiv.node.appendChild(imgContainer.hTag.node);
    alert('appendChild imgDiv');
    imgContainer.imgDiv.node.appendChild(imgContainer.imgTag.node);
    alert('appendChild mainDiv');
    imgContainer.mainDiv.node.appendChild(imgContainer.imgDiv.node);
	alert('appendChild mainDiv2');
    imgContainer.mainDiv.node.appendChild(imgContainer.dataDiv.node);
	alert('Done structure');
};