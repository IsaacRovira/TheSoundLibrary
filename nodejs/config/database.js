// config/database.js
var nodeDir	= "F:\\Program Files\\nodejs\\node_modules\\";
var mysql    	= require(nodeDir + 'mysql');

function con(){
	config = {
		hostname	: String,
		port		: int,
		username	: String,
		password	: String,
		database	: String
	}
	
	queries	= {
		users	:{
			email		: "select email from Users",
			password	: "select password from Users where email = ?",
			id_key		: "select id_key from Users"
		}
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