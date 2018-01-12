//config.js

//PATH
const RAIZ      = process.cwd();
const MODULOS   = RAIZ + "/node_modules/";
const NODE      = "c:\\nodejs\\";

//API
const APIPORT   = 3000;

//HTTP
const HTTPPORT  = 8080;

//SQL
const SQLPORT   = 3306;
const SQLIP     = "192.168.1.56";
const SQLUSER   = "nodejs";
const SQLPASS   = "node.js";
const SQLDB     = "soundlib";


module.exports ={
    modulos     : MODULOS,
    node        : NODE,
    raiz        : RAIZ,
    
    sql:{
        port    : SQLPORT,
        ip      : SQLIP,
        user    : SQLUSER,
        pass    : SQLPASS,
        db      : SQLDB
    },
    
    api:{
        port    : APIPORT,
    },
    
    http:{
        port    : HTTPPORT
    }
};