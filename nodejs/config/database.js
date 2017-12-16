var nodeDir	= "F:\\Program Files\nodejs\";
var mysql	= require(nodeDir + "mysql");

var localhost	= "127.0.0.1"
var puerto		= 3360;

module.exports = {
	
var con = mysql.createConnection({
	host: localhost,
	port: puerto,
	user: "nodejs",
	password: "node.js",
	database: "soundlib"
});

var queries={
	Users	:{
		count_email : "SELECT count(email) as email from Users where email = ?",
		email		: "SELECT email from Users",
		password	: "SELECT password from Users",
		id_key		: "SELECT id_key from Users",
		all			: "SELECT * from Users"
	}	
};


con.connect(){
	if(err)
		throw(err);
};

function query(sql){
	con.query(sql, function(err, result, fields){
		if(err) throw err;
		return(JSON.stringify(result));
	});
};


};