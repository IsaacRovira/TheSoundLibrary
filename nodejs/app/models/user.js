// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');

var wd 		 = "Y:\\ifp\\semestre4\\proyecto\\codigo\\nodejs\\";
var bcrypt   = require('bcrypt-nodejs');
var db       = require(wd+ 'config\\database.js');

// define the schema for our user model
Function userSchema() = {

    local            : {
		name         : String,
		id           : String,	
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
};


// methods ======================
// generating a hash
userSchema.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.prototype.validPassword = function(password) {
    return bcrypt.compareSync(this.local.password, password);
};

module.exports = userSchema;