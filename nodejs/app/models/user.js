// app/models/user.js
// load the things we need
//var mongoose = require('mongoose');

var bcrypt   = require('bcrypt-nodejs');
var db       = require('./config/database.js');

// define the schema for our user model
var userSchema = {

    local            : {
		name         : string,
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
	database		 :{
		all			 :db.query(db.queries.Users.all),
		email		 :db.query(db.queries.Users.email),
		password	 :db.query(db.queries.Users.password),
		id_key		 :db.query(db.queries.Users.id_key)
};

// methods ======================
// generating a hash
userSchema.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = UserSchema;