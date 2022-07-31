var sqlite3 = require("sqlite3");
var sqlite = require("sqlite");
var fs = require("fs");


var file = "./FX.db"
var db;

read();

async function read() {
	try {
		db = await sqlite.open({
			filename: file,
			driver: sqlite3.Database
		});

		var as = await db.all("SELECT * FROM strengths");
		console.log(as);
		as = await db.all("SELECT * FROM news");
		console.log(as);


	} catch(err) { console.log(err); }
}