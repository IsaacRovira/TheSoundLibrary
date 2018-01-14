//queryALL.js

const getAll = function (callback){
    const url = "http://127.0.0.1:3030/api/discos";    
    let xhttp= new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 201){
            //alert(this.responseText);            
            callback(this.responseText);
        }
    };
    
    xhttp.open("POST", url, true);
    xhttp.send();
};
