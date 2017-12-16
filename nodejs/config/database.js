// config/database.js
var mysql = require('mysql');

function con(){
	var config = {
	hostname	= String,
	port		= int,
	username	= String,
	password	= String,
	database	= String
	};
	
	var queries	= {
		users	:{
			email		: "select email from Users",
			password	: "select password from Users where email = ?",
			id_key		: "select id_key from Users";
		}
}

/*
con.prototype.connect(){
	mysql.createConnection({
	host: config.hostname,
	port: config.port,
	user: config.user,
	password: config.password,
	database: config.database
	});
};
*/

module.exports = con;