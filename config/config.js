//config.js

//PATH
const RAIZ      = process.cwd();
const MODULOS   = RAIZ + "\\node_modules\\";
const NODE      = "f:\\Program files\\nodejs\\";

//API
const APIPORT   = 3030;

//HTTP
const HTTPPORT  = 80;

//SQL
const SQLPORT   = 3306;
const SQLIP     = "192.168.8.111";
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
        port    : APIPORT
    },
    
    http:{
        port    : HTTPPORT
    }
};