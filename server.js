// server.js

console.log(process.cwd());
var config      = require(process.cwd()+'\\config\\config.js');
var path        = require(config.modulos + 'path');
var aux         = require(path.normalize(config.raiz + '/app/misc/misc.js'))
var api         = require(path.normalize(config.raiz + '/app/api/api.js'));
var app         = require(path.normalize(config.raiz + '/app/web/web.js'));

var port     	= process.env.PORT || config.http.port;

try{
    app.listen(port);
    console.log("\n"+ aux.ahora() + "\x1b[33m" +' Http server working on port ' + port + "\x1b[0m");

    api.listen(config.api.port);
    console.log("\n"+ aux.ahora() + "\x1b[33m" +' API listen on port ' + config.api.port +"\x1b[0m");

    console.log("\n"+ aux.ahora() + "\x1b[33m" +' Conectado a la base de datos ' + config.sql.ip + ':' + config.sql.port+"\x1b[0m"+"\n\n");
}
catch(err){
    console.log("\n\n"+err+"\n\n");
}
