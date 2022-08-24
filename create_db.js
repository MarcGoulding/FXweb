var sqlite3 = require("sqlite3");
var sqlite = require("sqlite");
var fs = require("fs");


var file = "./db/FX.db"
var db;
// del();
// removeEntry();
create();

async function del() {
	fs.unlinkSync(file);
}

async function removeEntry() {
	try {
		db = await sqlite.open({
			filename: file,
			driver: sqlite3.Database
		});
		await db.run("DELETE FROM news;");
		var as = await db.all("SELECT * FROM news");
		console.log(as);
	} catch (err) { console.log(err); }
}

async function create() {
	try {
		db = await sqlite.open({
			filename: file,
			driver: sqlite3.Database
		});
		// await db.run("PRAGMA foreign_keys = on");

		// Create Diary table
		// await db.run("CREATE TABLE fxalarms (pair, alarm, comment)");
		// await db.run("INSERT INTO fxalarms VALUES ('EURUSD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPUSD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('USDJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('AUDUSD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('NZDUSD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('USDCAD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('USDCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('AUDCAD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('AUDJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('AUDNZD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('AUDCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('CHFJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURGBP', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURAUD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURCAD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURNZD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('EURJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPCAD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPAUD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('GBPNZD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('NZDCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('NZDJPY', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('NZDCAD', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('CADCHF', '12:00:00', 'no comment')");
		// await db.run("INSERT INTO fxalarms VALUES ('CADJPY', '12:00:00', 'no comment')");
		as = await db.all("SELECT * FROM fxalarms");
		console.log(as);
		return;

		// Create strengths table
		await db.run("CREATE TABLE strengths (pair, base, quote, strength)");
		await db.run("INSERT INTO strengths VALUES ('EURUSD', 'EUR', 'USD', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPUSD', 'GBP', 'USD', 0)");
		await db.run("INSERT INTO strengths VALUES ('USDJPY', 'USD', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('AUDUSD', 'AUD', 'USD', 0)");
		await db.run("INSERT INTO strengths VALUES ('NZDUSD', 'NZD', 'USD', 0)");
		await db.run("INSERT INTO strengths VALUES ('USDCAD', 'USD', 'CAD', 0)");
		await db.run("INSERT INTO strengths VALUES ('USDCHF', 'USD', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('AUDCAD', 'AUD', 'CAD', 0)");
		await db.run("INSERT INTO strengths VALUES ('AUDJPY', 'AUD', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('AUDNZD', 'AUD', 'NZD', 0)");
		await db.run("INSERT INTO strengths VALUES ('AUDCHF', 'AUD', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('CHFJPY', 'CHF', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURCHF', 'EUR', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURGBP', 'EUR', 'GBP', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURAUD', 'EUR', 'AUD', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURCAD', 'EUR', 'CAD', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURNZD', 'EUR', 'NZD', 0)");
		await db.run("INSERT INTO strengths VALUES ('EURJPY', 'EUR', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPJPY', 'GBP', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPCHF', 'GBP', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPCAD', 'GBP', 'CAD', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPAUD', 'GBP', 'AUD', 0)");
		await db.run("INSERT INTO strengths VALUES ('GBPNZD', 'GBP', 'NZD', 0)");
		await db.run("INSERT INTO strengths VALUES ('NZDCHF', 'NZD', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('NZDJPY', 'NZD', 'JPY', 0)");
		await db.run("INSERT INTO strengths VALUES ('NZDCAD', 'NZD', 'CAD', 0)");
		await db.run("INSERT INTO strengths VALUES ('CADCHF', 'CAD', 'CHF', 0)");
		await db.run("INSERT INTO strengths VALUES ('CADJPY', 'CAD', 'JPY', 0)");
		var as = await db.all("SELECT * FROM strengths");
		console.log(as);

		// Create News table
		await db.run("CREATE TABLE news (id INTEGER PRIMARY KEY AUTOINCREMENT, currency, time, day)");
		await db.run("INSERT INTO news (currency, time, day) VALUES ('EUR', '13:30', 'Thursday')")
		as = await db.all("SELECT * FROM news");
		console.log(as);

	} catch (e) { console.log(e); }
}
