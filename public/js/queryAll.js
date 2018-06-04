//queryALL.js

var userid      =commonData.userId.get();
var serverName  =commonData.server.get();
var apiPort     =commonData.apiPort.get();

var fonoData;
var updateTime = 30000;

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
    xhttp.send(JSON.parse(userid));
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
    xhttp.send(JSON.parse(userid)+"&max=15");
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
