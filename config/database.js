// config/database.js

var config = require(process.cwd() + '/config/config.js');
var mysql = require(config.modulos + 'mysql');
var sqlite3 = require('sqlite3').verbose();

var sql = {
    config: {
        host: config.sql.ip,
        port: config.sql.port,
        user: config.sql.user,
        password: config.sql.pass,
        database: config.sql.db
    },
    users: {
        all: "select * from users",
        by_email: "select * from users where email = ?",
        by_id_key: "select * from users where ID_key = ?",
        by_token: "select * from users where token = ?",
        by_nombre: "select * from users where nombre = ?",
        by_displayName: "select * from users where displayName = ?",
        by_username: "select * from users where username = ?",
        by_id: "select * from users where userID = ?"
    },
    discos: {
        all: "SELECT discoId, album, artista, year, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid",
        by_id: "select * from discos where discoID = ?",
        by_album: "select * from discos where Album = ?",
        by_year: "select * from discos where year = ?",
        by_genero: "select * from discos where Genero = ?",
        by_soporte: "select * from discos where SoporteID = ?",
        by_artista: "select * from discos where Artista like '%?%'",
        by_identificador: "select * from discos where Identificador like '%?%'",
        by_Etiquetado: "select * from discos where Etiquetado like '%?%'",
        by_Any: "SELECT discoId, album, artista, year, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid ",
        by_max: "SELECT discoId, album, artista, year, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid  limit ?",
        withSong: "SELECT discoId, album, artista, year, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid \n\
        inner join canciones where discos.discoId = canciones.discoId "
    },
    generos: {
        all: "select * from generos",
        by_id: "select * from generos where generoID = ?",
        by_nombre: "select * from generos where genero = ?"
    },
    soportes: {
        all: "select * from soportes",
        by_id: "select * from soportes where soporteid = ?",
        by_tipo: "select * from soportes where soporteid = ?"
    },
    fonotecas: {
        all: "select * from fonotecas",
        by_id: "select * from fonotecas where fonoID = ?",
        by_nombre: "select * from fonotecas where nombre = ?",
        by_userID: "select * from fonotecas where userID = ?"
    },
    fonotecasdata: {
        all: "select * from fonotecasdata",
        by_id: "select * from fonotecasdata where FonotecasDataID = ?",
        by_discoID: "select * from fonotecasdata where DiscoID = ?",
        by_userID: "select * from fonotecasdata where userID = ?",
        canciones: 'SELECT cancionId, canciones.discoId, artistas, duracion, pista, titulo FROM canciones inner join discos on canciones.discoid = discos.discoid inner join fonotecasdata on discos.discoid = fonotecasdata.discoid INNER JOIN users on users.userID = fonotecasdata.userID where ID_key = ?',
        discos: 'SELECT discos.discoId, album, artista, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo, year from discos inner join soportes on discos.soporteid = soportes.soporteid inner join fonotecasdata on discos.discoid = fonotecasdata.discoid INNER JOIN users on users.userID = fonotecasdata.userID where ID_key = ?'
    },
    canciones: {
        all: "select cancionID, discoID, artistas, duracion, pista, titulo from canciones",
        by_id: "select * from canciones where CancionID = ",
        by_artistas: "select * from canciones where Artistas contains ",
        by_discoID: "select * from canciones where DiscoID = ",
        by_titulo: "select * from canciones where Titulo contains ",
        by_Any: "SELECT cancionId, discoId, artistas, duracion, pista, titulo FROM canciones "
    },
    discosNew: 'SELECT discos.discoID, album, artista, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo, year from discos inner join soportes on discos.soporteid = soportes.soporteid where DiscoID not in (select DISTINCT discoID from fonotecasdata INNER JOIN users on fonotecasdata.userID = users.UserID where ID_key = ?)',
    cancionesNew: 'SELECT cancionID, canciones.discoID, artistas, duracion, pista, titulo FROM canciones where DiscoID NOT IN (select DISTINCT discoID from fonotecasdata INNER JOIN users on fonotecasdata.userID = users.UserID where ID_key = ?)',
    
    //Devuelve una función para la consulta según el motor seleccionado en configuración.
    mysql:{
            connect:  function () {
                con = mysql.createConnection({
                    host: config.sql.ip,
                    port: config.sql.port,
                    user: config.sql.user,
                    password: config.sql.pass,
                    database: config.sql.db
                });
                return con;
            },
            query:  function(qry,param,callback){
                return sql.mysql.connect().query(qry,param,callback);
            },
            insert: function(qry,param,callback){
                return sql.mysql.connect().query(qry,param,callback);
            }
        },
    sqlite:{
            connect: new sqlite3.Database('./sqlite/soundlib.db', function (err){
                if(err){
                    console.log(err.message);
                }
                console.log("Conectado a la base de datos soundlib.db");
                /*
                sql.sqlite.connect.each("select * from users", [], function(err, row){
                    if(err){
                        console.log(err);
                    }
                    
                    console.log(row.email);
                });
                */
            }),
            query:  function(qry,parameter,callback){
                console.log(qry +" "+parameter);
                var param = parameter;
                if(typeof(parameter) === 'string'){
                    param = [param];                    
                }
                return sql.sqlite.connect.all(qry,param,callback);
            },
            insert: function(qry, parameter, callback){
                console.log(qry +" "+parameter);
                var param = parameter;
                if(typeof(parameter) === 'string'){
                    param = [param];
                }
                return sql.sqlite.connect.run(qry,param,callback);
            },
            queryall:  function(qry,parameter,callback){
                console.log(qry +" "+parameter);
                var param = parameter;
                if(typeof(parameter) === 'string'){
                    param = [param];                    
                }
                return sql.sqlite.connect.each(qry,param,callback);
            }
            
        }
};

module.exports = sql;