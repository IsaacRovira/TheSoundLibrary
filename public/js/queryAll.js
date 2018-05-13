//queryALL.js
var userid;
var url ={
    std :{
        general :{
            'discos'        : "http://127.0.0.1/discos",
            'canciones'     : "http://127.0.0.1/canciones"
        },
        fonotecas   :{
                'discos'    :"http://127.0.0.1/fonotecas/discos",
                'canciones' :"http://127.0.0.1/fonotecas/canciones"
        }        
    },
    api :{
        general :{
            'discos'        : "http://127.0.0.1:3030/api/discos",
            'canciones'     : "http://127.0.0.1:3030/api/canciones"
        },
        fonotecas   :{
                'discos'    :"http://127.0.0.1:3030/api/fonotecas/discos",
                'canciones' :"http://127.0.0.1:3030/api/fonotecas/canciones"
            }
        }
};

var fonoData;
var updateTime = 60000;
//******************************************************************************
//
//QUERIES
//
//******************************************************************************
//destino = /api/subdir
//queryString = nombre1=valor1&nombre2=valor2
function doQuery(queryString, destino, callback){
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            callback(this.responseText);
        }
    };
    
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(queryString+"&"+userid);
};

//Query all the data
function doQueryAll(destino, callback){    
	var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){            
            callback(this.responseText);
        }		
    };
    
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xhttp.send(userid);	
};


function doQueryAll2(destino, callback){
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){			
            fonoData = this.responseText;
			callback(fonoData);
			}
    };
	
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xhttp.send(userid);
};

function doQuerySongsByAlbum(destino, album, callback){
    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){			
            fonoData = this.responseText;            
            callback(fonoData);
	}
    };
	
    xhttp.open("POST", destino, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xhttp.send('discoId=' + album);    
};
	
//******************************************************************************
//******************************************************************************


var getAll = function (callback){
    var url = "http://127.0.0.1:3030/api/discos";    
    var xhttp= new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            //alert(this.responseText);            
            callback(this.responseText);
        }
    };
    
    xhttp.open("POST", url, true);
    xhttp.send();
};

function getUserId(){    
    userid = JSON.stringify(document.cookie);
}
