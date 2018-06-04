// config/database.js

var config = require(process.cwd() + '/config/config.js');
var mysql = require(config.modulos + 'mysql');


var sql = {
    config      : {
                host: config.sql.ip,
                port: config.sql.port,
                user: config.sql.user,
                password: config.sql.pass,
                database: config.sql.db
            },
    users       : {
                all: "select * from users",
                by_email: "select * from users where email = ?",
                by_id_key: "select * from users where ID_key = ",
                by_token: "select * from users where token = ?",
                by_nombre: "select * from users where nombre = ?",
                by_displayName: "select * from users where displayName = ?",
                by_username: "select * from users where username = ?",
                by_id: "select * from users where userID = ?"
            },
    discos      : {
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
                by_max: "SELECT discoId, album, artista, year, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo FROM discos inner join soportes on discos.soporteid = soportes.soporteid  limit ?"
            },
    generos     : {
                all: "select * from generos",
                by_id: "select * from generos where generoID = ?",
                by_nombre: "select * from generos where genero = ?"
            },
    soportes    : {
                all: "select * from soportes",
                by_id: "select * from soportes where soporteid = ?",
                by_tipo: "select * from soportes where soporteid = ?"
            },
    fonotecas   : {
                all: "select * from fonotecas",
                by_id: "select * from fonotecas where fonoID = ?",
                by_nombre: "select * from fonotecas where nombre = ?",
                by_userID: "select * from fonotecas where userID = ?",
                canciones: 'SELECT cancionId, canciones.discoId, artistas, duracion, pista, titulo FROM canciones inner join discos on canciones.discoid = discos.discoid inner join fonotecasdata on discos.discoid = fonotecasdata.discoid inner join fonotecas on fonotecasdata.fonoid = fonotecas.fonoid where fonotecas.userid in (select UserID from users where ID_key = ?)',
                discos: 'SELECT discos.discoId, album, artista, discografica, etiquetado, genero, identificadores, img_backcover, img_cover, tipo, year from discos inner join soportes on discos.soporteid = soportes.soporteid inner join fonotecasdata on discos.discoid = fonotecasdata.discoid inner join fonotecas on fonotecasdata.fonoid = fonotecas.fonoid where fonotecas.userid in (select UserID from users where ID_key = ?)'
            },
    fonotecasdata   : {
                all: "select * from fonotecasdata",
                by_id: "select * from fonotecasdata where FonotecasDataID = ?",
                by_discoID: "select * from fonotecasdata where DiscoID = ?",
                by_fonoID: "select * from fonotecasdata where FonoID = ?"
            },
    canciones   : {
                all: "select cancionId, discoId, artistas, duracion, pista, titulo from canciones",
                by_id: "select * from canciones where CancionID = ",
                by_artistas: "select * from canciones where Artistas contains ",
                by_discoID: "select * from canciones where DiscoID = ",
                by_titulo: "select * from canciones where Titulo contains ",
                by_Any: "SELECT cancionId, discoId, artistas, duracion, pista, titulo FROM canciones where "
            },
    connect     :
                function(){
                    con = mysql.createConnection({
                        host: config.sql.ip,
                        port: config.sql.port,
                        user: config.sql.user,
                        password: config.sql.pass,
                        database: config.sql.db
                    });
                    return con;
                }
};

module.exports = sql;
