// Define root folder
var root = "./public";

// Define some packages
("use strict");
const http = require("http");
const https = require("https");
const fs = require("fs").promises;
const fs_sync = require("fs");
const validUrl = require("valid-url");
const sqlite = require("sqlite-async");

// Import custom packages in serverscripts/
const TradingView = require("./server_scripts/TradingView/main");

// Define the private key and certificate for HTTPS
const security = {
  key: fs_sync.readFileSync("./certs/key.pem"),
  cert: fs_sync.readFileSync("./certs/certificate.pem")
};

// Define HTTP error codes
var OK = 200,
  NotFound = 404,
  BadType = 415,
  Error = 500;

// Define web domain and port
let port = 8000;
let domain = "localhost";

// Final global variable definitions
var types, paths;
var db = undefined;

// Start the server:
start();

// handles the requests, sending the request to relevant functions
function handle(request, response) {
  //find url, remove non ascii, add index
  var url = request.url.toLowerCase();
  url = remove_non_ascii(url);
  if (url.endsWith("/")) url = url + "index.html";

  // print details about request
  console.log("method=", request.method);
  console.log("url=", url);
  console.log("headers=", request.header);
  console.log("");

  // request file type validation -> can only be the types defined here
  if (
    !url.endsWith(".html") &&
    !url.endsWith(".js") &&
    !url.endsWith(".css") &&
    !url.endsWith(".png") &&
    !url.endsWith(".ico") &&
    !url.endsWith(".jpg") &&
    !url.endsWith(".jpeg") &&
    !url.includes("get/") &&
    !url.includes("strengths?") &&
    !url.includes("news?")
  ) {
    console.log("invalid request: ", url);
    return fail(response, BadType, "Bad request type");
  }

  // validate url requests to prevent filesystem access and to prevent admin page access
  if (
    url.includes("/.") ||
    url.includes("//") ||
    url.length > 300 ||
    url.includes("..") ||
    url.includes(".db")
  ) {
    console.log("illegal request: ", url);
    return fail(response, NotFound, "Illegal URL");
  }

  // Routing (calls to go to specific function)
  else if (url.startsWith("/get/evz")) getEVZ(url, response);
  else if (url.startsWith("/get/strengths")) getList(response, "strengths");
  else if (url.startsWith("/post/strengths?")) updateStrengths(url, request, response);
  else if (url.startsWith("/get/news")) getList(response, "news");
  else if (url.startsWith("/post/news?")) addNews(url, response);
  else if (url.startsWith("/del/news?")) delNews(url, response);
  else getFile(url, response);
}


// update news database with new entry.
async function addNews(url, response) {
  var data = url.split('?')[1]; // Split url
  var parts = data.split("_");
  // Add db entry and return ID to client

  var res = await db.run("INSERT INTO news (currency, time, day) VALUES ('"+parts[2]+"', '"+parts[1]+"', '"+parts[0]+"');");
  var id = String(res.lastID);
  deliver(response, types.txt, id);
}

// update news db removing entry.
async function delNews(url, response) {
  var id = url.split('?')[1];
  try{
    await db.run("DELETE FROM news WHERE id = "+id+";");
  } catch (err) {
    console.log(err);
  }
  console.log("News entry " + id + " deleted");
}

// function to update strength values in db.
async function updateStrengths(url, request, response) {

  var data = url.split("?")[1];  // Split url
  var parts = data.split('&');  // Split variables
  for (var i=0; i<parts.length; i++) {
    var keyvalue = parts[i].split('=');  // Read values
    // Store values in db
    console.log(keyvalue[0], keyvalue[1]);
    await db.run("UPDATE strengths SET strength = "+ keyvalue[1] + " WHERE pair = '" + keyvalue[0].toUpperCase() + "';");
  }

  console.log("new updated strengths");
  var as = await db.all("SELECT * FROM strengths");
  console.log(as);
  // Deliver OK response
  deliver(response, types.txt, "server db strengths updated");
}

// function to retreive $EVZ close price.
function getEVZ(url, response) {
  // scrape EVZ data from TradingView
  const client = new TradingView.Client();
  const chart = new client.Session.Chart();
  chart.setMarket('CBOE:EVZ', {timeframe: '240', range: 1, to: 0});
  var text = "(EVZ)";
  chart.onUpdate( function() {
    if (!chart.periods[0]) return;
    var text = `${chart.periods[0].close}`;
    deliver(response, "text/plain", text);
    client.end();
  });
}

// function to get list of banks for homepage.
async function getList(response, table) {
  //prepared statement to get all banks
  var statement = await db.prepare("SELECT * FROM " + table + ";");
  var list = await statement.all();

  // convert to JSON string and send to deliver
  console.log(list);
  var text = JSON.stringify(list);
  deliver(response, "text/plain", text);
}



// function to prepare the bank template with the gathered db info for that bank
function prepare(text, data, response) {
  //db check so that it does not crash if can't find the data
  if (data == undefined) return fail(response, NotFound, "Database error");

  // insert the db data into the relevant template places
  var parts = text.split("$");
  var page =
    parts[0] +
    data.name +
    parts[1] +
    data.id +
    parts[2] +
    data.name +
    parts[3] +
    data.link +
    parts[4] +
    data.facebook +
    parts[5] +
    data.linkedin +
    parts[6] +
    data.description +
    parts[7];

  // send the completed page to deliver
  deliver(response, "text/html", page);
}

// function to get any file that isnt a bank
async function getFile(url, response) {
  // get index page if ..../
  if (url.endsWith("/")) url = url + "index.html";

  // check url is ok
  var ok = await checkPath(url);
  if (!ok) return fail(response, NotFound, "URL not found (check case)");

  // get type of url
  var type = findType(url);
  if (type == null) return fail(response, BadType, "File type not supported");

  // get relative patch of ile, and read into contents
  var file = root + url;
  var content = await fs.readFile(file);

  // pass contents to deliver
  deliver(response, type, content);
}

// Deliver the file that has been read in to the browser.
function deliver(response, type, content) {
  // input the type into the header for the response
  var typeHeader = { "Content-Type": type };


  response.writeHead(OK, typeHeader);
  if (type == "image/jpeg" || type == "image/png") {
    // respond with images
    response.write(content);
  } else {
    // respond with text
    response.write(String(content));
  }
  response.end();
}

// Give a minimal failure response to the browser
async function fail(response, code, text) {

  url = "/error.html";
  var type = findType(url);
  var file = root + url;
  var content = await fs.readFile(file);

  var textTypeHeader = { "Content-Type": type };
  response.writeHead(code, textTypeHeader);
  response.write(content);
  response.end();
}

function defineTypes() {
  types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    mjs: "application/javascript", // for ES6 modules
    png: "image/png",
    gif: "image/gif", // for images copied unchanged
    jpeg: "image/jpeg", // for images copied unchanged
    jpg: "image/jpeg", // for images copied unchanged
    svg: "image/svg+xml",
    json: "application/json",
    pdf: "application/pdf",
    txt: "text/plain",
    ttf: "application/x-font-ttf",
    woff: "application/font-woff",
    aac: "audio/aac",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    webm: "video/webm",
    ico: "image/x-icon" // just for favicon.ico
  };
  return types;
}

// Check if a path is in or can be added to the set of site paths, in order
// to ensure case-sensitivity.
async function checkPath(path) {
  if (!paths.has(path)) {
    var n = path.lastIndexOf("/", path.length - 2);
    var parent = path.substring(0, n + 1);
    var ok = await checkPath(parent);
    if (ok) await addContents(parent);
  }
  return paths.has(path);
}

// Add the files and subfolders in a folder to the set of site paths.
async function addContents(folder) {
  var folderBit = 1 << 14;
  var names = await fs.readdir(root + folder);
  for (var name of names) {
    var path = folder + name;
    var stat = await fs.stat(root + path);
    if ((stat.mode & folderBit) != 0) path = path + "/";
    paths.add(path);
  }
}

// Find the content type to respond with, or undefined.
function findType(url) {
  var dot = url.lastIndexOf(".");
  var extension = url.substring(dot + 1);
  extension = extension.split(/\#|\?/g)[0];
  return types[extension];
}

// removes any non ascii characters from a string
function remove_non_ascii(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/[^\x20-\x7E]/g, "");
}

// redirects http requests to https service
function http_redirect(request, response) {
  var redirect = "https://" + domain;

  response.writeHead(301, { Location: redirect });
  response.end();
}

async function start() {
  try {
    // connect to bank database
    db = await sqlite.open("./db/FX.db");

    // checks if files exist
    await fs.access(root);
    await fs.access(root + "/index.html");

    // set our types and paths
    types = defineTypes();
    paths = new Set();
    paths.add("/");

    // create https service, listening on port 443 - send requests to handle function
    var service = https.createServer(security, handle);
    service.listen(port, domain);
    let address = "http://" + domain;

    console.log("Server running at", address);
    if (port != 80) address = address + ":" + port;
    console.log("or", address);


    // create http service , listening on port 80 - sends requests to http_redirect function
    var http_service = http.createServer(http_redirect);
    http_service.listen(80, domain);
  } catch (err) {
    // catch any errors
    console.log(err);
    process.exit(1);
  }
}