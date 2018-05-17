/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var url = "127.0.0.1:3030";
var xhttp;


if (window.XMLHttpRequest) {    
    xmlhttp = new XMLHttpRequest();
 } else {    
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

xhttp.open("POST",url,true);
xmlhttp.setRequestHeader("Content-type", 'application/json');
xhttp.send("");


xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML = this.responseText;
  }
};