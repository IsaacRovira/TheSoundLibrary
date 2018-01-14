//contentDetailGen.js



//Conexión

const url = "http://127.0.0.1:3030";
let xhttp= new XMLHttpRequest();

let query ={
    disco :{
        album           : "",
        id              : "",
        artista         : "",
        year            : "",
        sello           : "",
        genero          : "",
        identificadores : "",
        etiquetado      : "",
        soporteId       : ""
    },
    canciones ={
        artista         : "",
        id              : "",
        duracion        : "",
        titulo          : "",
    },
    fonotecas ={
        id              : "",
        nombre          : "",
        userId          : ""
    },
    fonodata ={
        fechaReg        : "",
        id      : "",
        numItems        : ""        
    },
    generos ={
        id              : "",
        Nombre          : ""        
    },
    soporte ={
        id              : "",
        tipo            : ""
    },
    usuario ={
        id              : "",
        Nombre          : "",
        email           : "",
        idKey           : "",
        token           : "",
        userName
    }
}



//destion = /dir/subdir
//queryString = nombre1=valor1&nombre2=valor2
function doQuery(queryString, destino, callback){
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            callback(this.responseText);
        }
    };
    
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.open("POST", url+destino, true,);
    xhttp.send(queryString);
};

function doQueryAll(destino, callback){
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            callback(this.responseText);
        }
    };
    
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.open("POST", url+destino, true,);
    xhttp.send();
};

function getDiscDetails(datos){
    datos = JSON.parse(datos);
    
    for(let i=0; i < datos.length; i++){
        
    }
};