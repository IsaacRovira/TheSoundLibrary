//aux.js

/*
Funcione auxiliares para todos los modulos
*/
var config = require(process.cwd() + '/config/config.js');
//Porque no funciona??!!!!!!!!!!!!!!!
var aux ={
    ahora: function(){
      		var d = new Date();
          return d.toLocaleString();
          }
};

module.exports = aux;
