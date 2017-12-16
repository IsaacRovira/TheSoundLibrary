// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');

var wd 		 = "Y:\\ifp\\semestre4\\proyecto\\codigo\\nodejs\\";
var bcrypt   = require('bcrypt-nodejs');
var db       = require(wd+ 'config\\database.js');

// define the schema for our user model
module.exports = function () {

    this.local            = {
		name         : "",
		id           : "",	
        email        : "",
        password     : "",
    }
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
    }
	
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
	}
	this.validPassword = function(pass, hash) {
		return bcrypt.compareSync(pass, hash);
	}
};