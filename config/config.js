//config.js

//PATH
const RAIZ      = process.cwd();
const MODULOS   = RAIZ + "\\node_modules\\";
const NODE      = "f:\\Program files\\nodejs\\";

//API
const APIPORT   = 3000;

//HTTP
const HTTPPORT  = 80;

//SQL
const SQLPORT   = 3360;
const SQLIP     = "127.0.0.1";
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