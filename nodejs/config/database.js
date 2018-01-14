// config/database.js

var config = require(process.cwd() + '/config/config.js');
var mysql = require(config.modulos + 'mysql');


var sql = {
    config
            : {
                host: config.sql.ip,
                port: config.sql.port,
                user: config.sql.user,
                password: config.sql.pass,
                database: config.sql.db
            },
    users
            : {
                all: "select * from Users", 
                by_email: "select * from Users where email = ?",
                by_id_key: "select * from Users where Id_key = ?",
                by_token: "select * from Users where token = ?",
                by_nombre: "select * from Users where nombre = ?",
                by_displayName: "select * from Users where displayName = ?",
                by_username: "select * from Users where username = ?",
                by_id: "select * from Users where userID = ?"                
            },
    discos
            : {
                all: "SELECT discoid, album, artista, year, discografica, etiquetado, genero, identificadores, Tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid",
                by_id: "select * from discos where discoID = ?",
                by_album: "select * from discos where Album = ?",
                by_year: "select * from discos where year = ?",
                by_genero: "select * from discos where Genero = ?",
                by_soporte: "select * from discos where SoporteID = ?",
                by_artista: "select * from discos where Artista like '%?%'",
                by_identificador: "select * from discos where Identificador like '%?%'",
                by_Etiquetado: "select * from discos where Etiquetado like '%?%'",
                by_Any: "SELECT discoid, album, artista, year, discografica, etiquetado, genero, identificadores, Tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid where "

            },
    generos
            : {
                all: "select * from generos",
                by_id: "select * from generos where generoID = ?",
                by_nombre: "select * from generos where genero = ?"
            },
    soportes
            : {
                all: "select * from soportes",
                by_id: "select * from soportes where soporteid = ?",
                by_tipo: "select * from soportes where soporteid = ?"
            },
    fonotecas
            : {
                all: "select * from fonotecas",
                by_id: "select * from fonotecas where fonoID = ?",
                by_nombre: "select * from fonotecas where nombre = ?",
                by_userID: "select * from fonotecas where userID = ?",
                canciones: 'SELECT cancionID, canciones.discoID, Artistas, Duracion, Pista, Titulo FROM canciones inner join discos on canciones.discoid = discos.discoid inner join fonotecasdata on discos.discoid = fonotecasdata.discoid inner join fonotecas on fonotecasdata.fonoid = fonotecas.fonoid where fonotecas.userid='
            },
    fonotecasdata
            : {
                all: "select * from fonotecasdata",
                by_id: "select * from fonotecasdata where FonotecasDataID = ?",
                by_discoID: "select * from fonotecasdata where DiscoID = ?",
                by_fonoID: "select * from fonotecasdata where FonoID = ?"
            },
    canciones
            : {
                all: "select * from canciones",
                by_id: "select * from canciones where CancionID = ?",
                by_artistas: "select * from canciones where Artistas contains ?",
                by_discoID: "select * from canciones where DiscoID = ?",
                by_titulo: "select * from canciones where Titulo contains ?",
                by_Any: "SELECT cancionID, DiscoID, Artistas, Duracion, Pista, Titulo FROM canciones where "
            }
}

sql.conectar = function () {
    con = mysql.createConnection({
        host: sql.config.host,
        port: sql.config.port,
        user: sql.config.user,
        password: sql.config.password,
        database: sql.config.database
    })
    return con;
};

module.exports = sql;