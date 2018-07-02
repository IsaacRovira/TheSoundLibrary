//user.js
//var nodeDir	= "F:\\Program Files\\nodejs\\node_modules\\";
var config          = require(process.cwd()+'/config/config.js');
var bcrypt   = require(config.modulos + 'bcrypt-nodejs');

// define the schema for our user model
module.exports = function () {

    this.local            = {
        name         : "",
        id           : "",	
        email        : "",
        password     : ""
    },
    this.facebook         = {
        id           : "",
        token        : "",
        name         : "",
        email        : ""
    },
    this.twitter          = {
        id           : "",
        token        : "",
        displayName  : "",
        username     : ""
    },
    this.google           = {
        id           : "",
        token        : "",
        email        : "",
        name         : ""
    },
	
    //************
    // métodos
    //************

    // generar hash
    this.generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    // password correcto?
    this.validPassword = function(password) {
            return bcrypt.compareSync(this.local.password, password);
    };
    this.validPassword = function(pass, hash) {
            return bcrypt.compareSync(pass, hash);
    };
};