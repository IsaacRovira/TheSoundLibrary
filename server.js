// server.js

console.log(process.cwd());
var config      = require(process.cwd()+'\\config\\config.js');
var path        = require(config.modulos + 'path');

var api         = require(path.normalize(config.raiz + '/app/api/api.js'));
var app         = require(path.normalize(config.raiz + '/app/web/web.js'));

var port     	= process.env.PORT || config.http.port;

app.listen(port);
console.log('Http server working on port ' + port);

api.listen(config.api.port);
console.log('API listen on port ' + config.api.port);