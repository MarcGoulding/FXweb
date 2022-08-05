console.log("starting index.js ...");

window.onload = () => {
    $('#onload').modal('show');

    fetchEVZ();
    fetchStrengths();
    fetchNews();
}

var risk = 1.104
var tradeableCurrencies = {};
var tradeablePairs = [];

// Close modal after a few seconds
setTimeout(
  function() {
    $("#onload").modal('hide');
  }, 7000
);

// Open trades alert
setTimeout(
  function(){
    alert("Are your open trades okay?");
  }, 7500
);

// Function to request EVZ value from server
function fetchEVZ() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = receiveEVZ;
  q.open("GET", '/get/evz', true);
  q.send();
}

// Handler to process EVZ received from server
function receiveEVZ() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  var text = this.responseText;
  $('#EVZValue').text(text);

  // Update risk value based on EVZ value
  var evz = parseInt(text);
  if (evz >= 7) $('#riskValue').text(risk + "%");
  else if (7 > evz && evz >= 5) $('#riskValue').text(risk/2 + "%");
  else if (evz < 5) $('#riskValue').text(risk/2 + "% (range only)");
}

// Fetch news list from server
function fetchNews() {
  var q = new XMLHttpRequest();
  q.onreadystatechange = receiveNews;
  q.open("GET", "/get/news", true);
  q.send();
}

// Handle news list received from server
function receiveNews() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);
  var value = document.querySelector("#newsInput");
  var msg = "";
  for (var i=0; i<list.length; i++) {
    msg = list[i].day + " " + list[i].time + " " + list[i].currency;
    value.value = msg;
    addInitialNewsList(list[i].id);
  }
  value.value = "";
}

// Function to add news elements to li
function addInitialNewsList(id) {
  var li = document.createElement("li");
  var inputValue = document.getElementById("newsInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  var span = document.createElement("SPAN");
  document.getElementById("newsList").appendChild(li);

  var txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(txt);
  span.id = id;
  li.appendChild(span);
  li.classList.add("py-2");

  span.onclick = function() {
    var li = this.parentElement;
    // Remove from db
    delNews(this.id);
    li.parentNode.removeChild(li);  // Remove li from list
  };
}

// CLOCKS
updateClocks();
function addZero (time) {return time < 10 ? (`0${time}`) : time;}
function updateClocks(){
  const date = new Date();
  var newYorkTimeEl = document.getElementById("new-york");
  var londonTimeEl = document.getElementById("london");
  var tokyoTimeEl = document.getElementById("tokyo");
  var sydneyTimeEl = document.getElementById("sydney");
  var h = addZero(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());
  newYorkTimeEl.innerHTML = ((h-5+23)%23)+':'+m;
  londonTimeEl.innerHTML = h+':'+m;
  tokyoTimeEl.innerHTML = ((h+9)%23)+':'+m;
  sydneyTimeEl.innerHTML = ((h+11)%23)+':'+m;

  /* Display timezones not between 9-5 in red */
  if (((h-5)%23)<9 || ((h-5)%23)>=17) {
      newYorkTimeEl.style.color = '#1C1A7E';
  }else{
      newYorkTimeEl.style.color = 'white';
  }
  if (h<9 || h>17) {
      londonTimeEl.style.color = '#1C1A7E';
  }else{
      londonTimeEl.style.color = 'white';
  }
  if (((h+9)%23)<9 || ((h+9)%23)>17) {
      tokyoTimeEl.style.color = '#1C1A7E';
  }else{
      tokyoTimeEl.style.color = 'white';
  }
  if (((h+11)%23)<9 || ((h+11)%23)>17) {
      sydneyTimeEl.style.color = '#1C1A7E';
  }else{
      sydneyTimeEl.style.color = 'white';
  }

  /* Display seconds in bottom-right corner */
  var sec = document.getElementById("seconds-timer");
  sec.innerHTML = s;
} setInterval(updateClocks, 1000);


// Function to send news entry to server
function postNews(news, element) {
  var params = news.replace(/ /g,"_");
  var url = "/post/news?" + params;
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    var text = this.responseText;
    element.id = text;
  };
  req.open("POST", url, true);
  req.send();
}

// Function to delete news entry on server
function delNews(id) {
  var url = "/del/news?" + id;
  var req = new XMLHttpRequest();
  req.onreadystatechange = ()=>{};
  req.open("GET", url, true);
  req.send();
}

// Create a new list item when clicking on the "Add" button
function newNewsElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("newsInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  var span = document.createElement("SPAN");
  if (inputValue === '') {
    alert("Write something!");
  } else {
    document.getElementById("newsList").appendChild(li);
    postNews(inputValue, span);
  }
  document.getElementById("newsInput").value = "";

  var txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(txt);
  li.appendChild(span);
  li.classList.add("py-2");

  span.onclick = function() {
    var li = this.parentElement;
    delNews(this.id);  // Remove from db
    li.parentNode.removeChild(li);  // Remove li from list
  };
}


// ----------------------- STRENGTH ANALYSIS -----------------

function fetchStrengths() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = receiveStrengths;
  req.open("GET", "/get/strengths", true);
  req.send();
}

function receiveStrengths() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);

  // Update strength values with db values
  for (var i=0; i<list.length; i++) {
     strengths[list[i].pair] = list[i].strength;
     updateStrengthStyle(list[i].pair);
  }

  // Finally, calculate strengths for each currency
  generateStrengthOutput();
}

var saveButton = document.querySelector('.fa-cloud-arrow-up');
saveButton.onclick = postStrengths;

function postStrengths() {
  var data = new URLSearchParams();
  for (const [key, value] of Object.entries(strengths)) {
    data.append(key, value);
  }
  var url = "/post/strengths?" + data.toString();
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState != XMLHttpRequest.DONE) return;
    var text = this.responseText;
    console.log(text);
  };
  req.open("POST", url, true);
  req.send();
}


/* initialise strength analysis output text elements */
currencyOutputs = {
  eur: document.getElementById("eur-strength"),
  usd: document.getElementById("usd-strength"),
  chf: document.getElementById("chf-strength"),
  gbp: document.getElementById("gbp-strength"),
  cad: document.getElementById("cad-strength"),
  aud: document.getElementById("aud-strength"),
  nzd: document.getElementById("nzd-strength"),
  jpy: document.getElementById("jpy-strength")
};

// strength values for each currency pair.
strengths = {
  /* long=1 short=-1 range=0 */
  EURUSD:0,
  GBPUSD:0,
  NZDUSD:0,
  AUDUSD:0,
  USDCAD:0,
  USDCHF:0,
  USDJPY:0,
  EURGBP:0,
  EURAUD:0,
  EURCAD:0,
  EURJPY:0,
  EURNZD:0,
  EURCHF:0,
  GBPJPY:0,
  GBPNZD:0,
  GBPAUD:0,
  GBPCHF:0,
  GBPCAD:0,
  AUDNZD:0,
  AUDCAD:0,
  AUDCHF:0,
  AUDJPY:0,
  NZDCAD:0,
  NZDJPY:0,
  NZDCHF:0,
  CADJPY:0,
  CADCHF:0,
  CHFJPY:0
};


function generateStrengthOutput() {
  tradeableCurrencies = {
    'long': [],
    'short': []
  };

  /* Check all pairs for each currency */
  /* USD */
  strength = 0;
  strength = strengths.EURUSD==-1? strength+1 : strength;
  strength = strengths.EURUSD== 1? strength-1 : strength;
  strength = strengths.GBPUSD==-1? strength+1 : strength;
  strength = strengths.GBPUSD== 1? strength-1 : strength;
  strength = strengths.AUDUSD==-1? strength+1 : strength;
  strength = strengths.AUDUSD== 1? strength-1 : strength;
  strength = strengths.NZDUSD==-1? strength+1 : strength;
  strength = strengths.NZDUSD== 1? strength-1 : strength;
  strength = strengths.USDCHF== 1? strength+1 : strength;
  strength = strengths.USDCHF==-1? strength-1 : strength;
  strength = strengths.USDJPY== 1? strength+1 : strength;
  strength = strengths.USDJPY==-1? strength-1 : strength;
  strength = strengths.USDCAD== 1? strength+1 : strength;
  strength = strengths.USDCAD==-1? strength-1 : strength;
  currencyOutputs.usd.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.usd.style.color = "green";
    tradeableCurrencies['long'].push('USD');
  } else if(strength <= -3) {
    currencyOutputs.usd.style.color = "red";
    tradeableCurrencies['short'].push('USD');
  } else {
    currencyOutputs.usd.style.color = "gray";
  }
  /* EUR */
  strength = 0;
  strength = strengths.EURUSD==+1? strength+1 : strength;
  strength = strengths.EURUSD==-1? strength-1 : strength;
  strength = strengths.EURGBP==+1? strength+1 : strength;
  strength = strengths.EURGBP==-1? strength-1 : strength;
  strength = strengths.EURAUD==+1? strength+1 : strength;
  strength = strengths.EURAUD==-1? strength-1 : strength;
  strength = strengths.EURCAD==+1? strength+1 : strength;
  strength = strengths.EURCAD==-1? strength-1 : strength;
  strength = strengths.EURCHF==+1? strength+1 : strength;
  strength = strengths.EURCHF==-1? strength-1 : strength;
  strength = strengths.EURJPY==+1? strength+1 : strength;
  strength = strengths.EURJPY==-1? strength-1 : strength;
  strength = strengths.EURNZD==+1? strength+1 : strength;
  strength = strengths.EURNZD==-1? strength-1 : strength;
  currencyOutputs.eur.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.eur.style.color = "green";
    tradeableCurrencies['long'].push('EUR');
  } else if(strength <= -3) {
    currencyOutputs.eur.style.color = "red";
    tradeableCurrencies['short'].push('EUR');
  } else {
    currencyOutputs.eur.style.color = "gray";
  }
  /* GBP */
  strength = 0;
  strength = strengths.GBPUSD==+1? strength+1 : strength;
  strength = strengths.GBPUSD==-1? strength-1 : strength;
  strength = strengths.EURGBP==-1? strength+1 : strength;
  strength = strengths.EURGBP==+1? strength-1 : strength;
  strength = strengths.GBPAUD==+1? strength+1 : strength;
  strength = strengths.GBPAUD==-1? strength-1 : strength;
  strength = strengths.GBPCAD==+1? strength+1 : strength;
  strength = strengths.GBPCAD==-1? strength-1 : strength;
  strength = strengths.GBPCHF==+1? strength+1 : strength;
  strength = strengths.GBPCHF==-1? strength-1 : strength;
  strength = strengths.GBPJPY==+1? strength+1 : strength;
  strength = strengths.GBPJPY==-1? strength-1 : strength;
  strength = strengths.GBPNZD==+1? strength+1 : strength;
  strength = strengths.GBPNZD==-1? strength-1 : strength;
  currencyOutputs.gbp.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.gbp.style.color = "green";
    tradeableCurrencies['long'].push('GBP');
  } else if(strength <= -3) {
    currencyOutputs.gbp.style.color = "red";
    tradeableCurrencies['short'].push('GBP');
  } else {
    currencyOutputs.gbp.style.color = "gray";
  }
  /* AUD */
  strength = 0;
  strength = strengths.AUDUSD==+1? strength+1 : strength;
  strength = strengths.AUDUSD==-1? strength-1 : strength;
  strength = strengths.GBPAUD==-1? strength+1 : strength;
  strength = strengths.GBPAUD==+1? strength-1 : strength;
  strength = strengths.EURAUD==+1? strength+1 : strength;
  strength = strengths.EURAUD==-1? strength-1 : strength;
  strength = strengths.AUDCAD==+1? strength+1 : strength;
  strength = strengths.AUDCAD==-1? strength-1 : strength;
  strength = strengths.AUDCHF==+1? strength+1 : strength;
  strength = strengths.AUDCHF==-1? strength-1 : strength;
  strength = strengths.AUDJPY==+1? strength+1 : strength;
  strength = strengths.AUDJPY==-1? strength-1 : strength;
  strength = strengths.AUDNZD==+1? strength+1 : strength;
  strength = strengths.AUDNZD==-1? strength-1 : strength;
  currencyOutputs.aud.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.aud.style.color = "green";
    tradeableCurrencies['long'].push('AUD');
  } else if(strength <= -3) {
    currencyOutputs.aud.style.color = "red";
    tradeableCurrencies['short'].push('AUD');
  } else {
    currencyOutputs.aud.style.color = "gray";
  }
  /* CAD */
  strength = 0;
  strength = strengths.USDCAD==-1? strength+1 : strength;
  strength = strengths.USDCAD==+1? strength-1 : strength;
  strength = strengths.GBPCAD==-1? strength+1 : strength;
  strength = strengths.GBPCAD==+1? strength-1 : strength;
  strength = strengths.AUDCAD==-1? strength+1 : strength;
  strength = strengths.AUDCAD==+1? strength-1 : strength;
  strength = strengths.EURCAD==-1? strength+1 : strength;
  strength = strengths.EURCAD==+1? strength-1 : strength;
  strength = strengths.CADCHF==+1? strength+1 : strength;
  strength = strengths.CADCHF==-1? strength-1 : strength;
  strength = strengths.CADJPY==+1? strength+1 : strength;
  strength = strengths.CADJPY==-1? strength-1 : strength;
  strength = strengths.NZDCAD==-1? strength+1 : strength;
  strength = strengths.NZDCAD==+1? strength-1 : strength;
  currencyOutputs.cad.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.cad.style.color = "green";
    tradeableCurrencies['long'].push('CAD');
  } else if(strength <= -3) {
    currencyOutputs.cad.style.color = "red";
    tradeableCurrencies['short'].push('CAD');
  } else {
    currencyOutputs.cad.style.color = "gray";
  }
  /* NZD */
  strength = 0;
  strength = strengths.NZDUSD==+1? strength+1 : strength;
  strength = strengths.NZDUSD==-1? strength-1 : strength;
  strength = strengths.GBPNZD==-1? strength+1 : strength;
  strength = strengths.GBPNZD==+1? strength-1 : strength;
  strength = strengths.AUDNZD==-1? strength+1 : strength;
  strength = strengths.AUDNZD==+1? strength-1 : strength;
  strength = strengths.NZDCAD==+1? strength+1 : strength;
  strength = strengths.NZDCAD==-1? strength-1 : strength;
  strength = strengths.NZDCHF==+1? strength+1 : strength;
  strength = strengths.NZDCHF==-1? strength-1 : strength;
  strength = strengths.NZDJPY==+1? strength+1 : strength;
  strength = strengths.NZDJPY==-1? strength-1 : strength;
  strength = strengths.EURNZD==-1? strength+1 : strength;
  strength = strengths.EURNZD==+1? strength-1 : strength;
  currencyOutputs.nzd.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.nzd.style.color = "green";
    tradeableCurrencies['long'].push('NZD');
  } else if(strength <= -3) {
    currencyOutputs.nzd.style.color = "red";
    tradeableCurrencies['short'].push('NZD');
  } else {
    currencyOutputs.nzd.style.color = "gray";
  }
  /* JPY */
  strength = 0;
  strength = strengths.USDJPY==-1? strength+1 : strength;
  strength = strengths.USDJPY==+1? strength-1 : strength;
  strength = strengths.GBPJPY==-1? strength+1 : strength;
  strength = strengths.GBPJPY==+1? strength-1 : strength;
  strength = strengths.AUDJPY==-1? strength+1 : strength;
  strength = strengths.AUDJPY==+1? strength-1 : strength;
  strength = strengths.CADJPY==-1? strength+1 : strength;
  strength = strengths.CADJPY==+1? strength-1 : strength;
  strength = strengths.CHFJPY==-1? strength+1 : strength;
  strength = strengths.CHFJPY==+1? strength-1 : strength;
  strength = strengths.NZDJPY==-1? strength+1 : strength;
  strength = strengths.NZDJPY==+1? strength-1 : strength;
  strength = strengths.EURJPY==-1? strength+1 : strength;
  strength = strengths.EURJPY==+1? strength-1 : strength;
  currencyOutputs.jpy.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.jpy.style.color = "green";
    tradeableCurrencies['long'].push('JPY');
  } else if(strength <= -3) {
    currencyOutputs.jpy.style.color = "red";
    tradeableCurrencies['short'].push('JPY');
  } else {
    currencyOutputs.jpy.style.color = "gray";
  }
  /* CHF */
  strength = 0;
  strength = strengths.USDCHF==-1? strength+1 : strength;
  strength = strengths.USDCHF==+1? strength-1 : strength;
  strength = strengths.GBPCHF==-1? strength+1 : strength;
  strength = strengths.GBPCHF==+1? strength-1 : strength;
  strength = strengths.AUDCHF==-1? strength+1 : strength;
  strength = strengths.AUDCHF==+1? strength-1 : strength;
  strength = strengths.CADCHF==-1? strength+1 : strength;
  strength = strengths.CADCHF==+1? strength-1 : strength;
  strength = strengths.NZDCHF==-1? strength+1 : strength;
  strength = strengths.NZDCHF==+1? strength-1 : strength;
  strength = strengths.CHFJPY==+1? strength+1 : strength;
  strength = strengths.CHFJPY==-1? strength-1 : strength;
  strength = strengths.EURCHF==-1? strength+1 : strength;
  strength = strengths.EURCHF==+1? strength-1 : strength;
  currencyOutputs.chf.innerText = strength;
  if (strength >= 3) {
    currencyOutputs.chf.style.color = "green";
    tradeableCurrencies['long'].push('CHF');
  } else if(strength <= -3) {
    currencyOutputs.chf.style.color = "red";
    tradeableCurrencies['short'].push('CHF');
  } else {
    currencyOutputs.chf.style.color = "gray";
  }

  generateTradeablePairs();
}

function changeStrength(value){
  value++;
  if (value > 1){
    value = -1;
  }
  return value;
}

var validPairs = [
  'EURUSD',
  'GBPUSD',
  'USDJPY',
  'AUDUSD',
  'NZDUSD',
  'USDCAD',
  'USDCHF',
  'AUDCAD',
  'AUDJPY',
  'AUDNZD',
  'AUDCHF',
  'CHFJPY',
  'EURCHF',
  'EURGBP',
  'EURAUD',
  'EURCAD',
  'EURNZD',
  'EURJPY',
  'GBPJPY',
  'GBPCHF',
  'GBPCAD',
  'GBPAUD',
  'GBPNZD',
  'NZDCHF',
  'NZDJPY',
  'NZDCAD',
  'CADCHF',
  'CADJPY',
];

function generateTradeablePairs() {
  var extensiveListOfPairs = [];
  var tradeablePairs = [];
  // for each currency
  for (var j=0; j<tradeableCurrencies['short'].length; j++) {
    for (var i=0; i<tradeableCurrencies['long'].length; i++) {
      extensiveListOfPairs.push(tradeableCurrencies['long'][i] + tradeableCurrencies['short'][j]);
      extensiveListOfPairs.push(tradeableCurrencies['short'][j] + tradeableCurrencies['long'][i]);
    }
  }
  for (var i=0; i<extensiveListOfPairs.length; i++) {
    if (validPairs.includes(extensiveListOfPairs[i])) {
      tradeablePairs.push(extensiveListOfPairs[i]);
    }
  }

  // Clear previous list in HTML
  var shortlist = document.querySelector("#short-list");
  var longlist = document.querySelector("#long-list");
  shortlist.innerHTML = "";
  longlist.innerHTML = "";

  // Add list titles to HTML
  var longtitleli = document.createElement("li");
  longtitleli.appendChild(document.createTextNode("LONG"));
  longtitleli.style.color = "green";
  longtitleli.style.fontSize = "1.4rem";
  longlist.appendChild(longtitleli);

  var shorttitleli = document.createElement("li");
  shorttitleli.appendChild(document.createTextNode("SHORT"));
  shorttitleli.style.color = "red";
  shorttitleli.style.fontSize = "1.4rem";
  shortlist.appendChild(shorttitleli);

  // Add list of pairs to HTML
  for (var i=0; i<tradeablePairs.length; i++) {
    var text = tradeablePairs[i];
    var li = document.createElement("li");
    var t = document.createTextNode(text);
    li.appendChild(t);
    if (tradeableCurrencies['long'].includes(text.substring(0,3))) longlist.appendChild(li);
    else shortlist.appendChild(li);
  }
}
  
function updateStrengthStyle(pair) {
  /* Change styling to new value */
  switch(strengths[pair]){
    case 1:
      cells[pair].style.backgroundColor = "green";
      break;
    case -1:
      cells[pair].style.backgroundColor = "red";
      break;
    case 0:
      cells[pair].style.backgroundColor = "yellow";
      break;
  }
}

function updateStrengthCell() {
  strengths[this.id] = changeStrength(strengths[this.id]);
  updateStrengthStyle(this.id);
  generateStrengthOutput();
}

/* Set strength value for each pair after clicking a cell in the table */
cells = {
  EURUSD: document.getElementById("EURUSD"),
  GBPUSD: document.getElementById("GBPUSD"),
  NZDUSD: document.getElementById("NZDUSD"),
  AUDUSD: document.getElementById("AUDUSD"),
  USDCAD: document.getElementById("USDCAD"),
  USDCHF: document.getElementById("USDCHF"),
  USDJPY: document.getElementById("USDJPY"),
  EURGBP: document.getElementById("EURGBP"),
  EURAUD: document.getElementById("EURAUD"),
  EURCAD: document.getElementById("EURCAD"),
  EURJPY: document.getElementById("EURJPY"),
  EURNZD: document.getElementById("EURNZD"),
  EURCHF: document.getElementById("EURCHF"),
  GBPJPY: document.getElementById("GBPJPY"),
  GBPNZD: document.getElementById("GBPNZD"),
  GBPAUD: document.getElementById("GBPAUD"),
  GBPCHF: document.getElementById("GBPCHF"),
  GBPCAD: document.getElementById("GBPCAD"),
  AUDNZD: document.getElementById("AUDNZD"),
  AUDCAD: document.getElementById("AUDCAD"),
  AUDCHF: document.getElementById("AUDCHF"),
  AUDJPY: document.getElementById("AUDJPY"),
  NZDCAD: document.getElementById("NZDCAD"),
  NZDJPY: document.getElementById("NZDJPY"),
  NZDCHF: document.getElementById("NZDCHF"),
  CADJPY: document.getElementById("CADJPY"),
  CADCHF: document.getElementById("CADCHF"),
  CHFJPY: document.getElementById("CHFJPY")
};
cells.EURUSD.id = "EURUSD";
cells.GBPUSD.id = "GBPUSD";
cells.NZDUSD.id = "NZDUSD";
cells.AUDUSD.id = "AUDUSD";
cells.USDCAD.id = "USDCAD";
cells.USDCHF.id = "USDCHF";
cells.USDJPY.id = "USDJPY";
cells.EURGBP.id = "EURGBP";
cells.EURAUD.id = "EURAUD";
cells.EURCAD.id = "EURCAD";
cells.EURJPY.id = "EURJPY";
cells.EURNZD.id = "EURNZD";
cells.EURCHF.id = "EURCHF";
cells.GBPJPY.id = "GBPJPY";
cells.GBPNZD.id = "GBPNZD";
cells.GBPAUD.id = "GBPAUD";
cells.GBPCHF.id = "GBPCHF";
cells.GBPCAD.id = "GBPCAD";
cells.AUDNZD.id = "AUDNZD";
cells.AUDCAD.id = "AUDCAD";
cells.AUDCHF.id = "AUDCHF";
cells.AUDJPY.id = "AUDJPY";
cells.NZDCAD.id = "NZDCAD";
cells.NZDJPY.id = "NZDJPY";
cells.NZDCHF.id = "NZDCHF";
cells.CADJPY.id = "CADJPY";
cells.CADCHF.id = "CADCHF";
cells.CHFJPY.id = "CHFJPY";
cells.EURUSD.onclick = updateStrengthCell;
cells.GBPUSD.onclick = updateStrengthCell;
cells.NZDUSD.onclick = updateStrengthCell;
cells.AUDUSD.onclick = updateStrengthCell;
cells.USDCAD.onclick = updateStrengthCell;
cells.USDCHF.onclick = updateStrengthCell;
cells.USDJPY.onclick = updateStrengthCell;
cells.EURGBP.onclick = updateStrengthCell;
cells.EURAUD.onclick = updateStrengthCell;
cells.EURCAD.onclick = updateStrengthCell;
cells.EURJPY.onclick = updateStrengthCell;
cells.EURNZD.onclick = updateStrengthCell;
cells.EURCHF.onclick = updateStrengthCell;
cells.GBPJPY.onclick = updateStrengthCell;
cells.GBPNZD.onclick = updateStrengthCell;
cells.GBPAUD.onclick = updateStrengthCell;
cells.GBPCHF.onclick = updateStrengthCell;
cells.GBPCAD.onclick = updateStrengthCell;
cells.AUDNZD.onclick = updateStrengthCell;
cells.AUDCAD.onclick = updateStrengthCell;
cells.AUDCHF.onclick = updateStrengthCell;
cells.AUDJPY.onclick = updateStrengthCell;
cells.NZDCAD.onclick = updateStrengthCell;
cells.NZDJPY.onclick = updateStrengthCell;
cells.NZDCHF.onclick = updateStrengthCell;
cells.CADJPY.onclick = updateStrengthCell;
cells.CADCHF.onclick = updateStrengthCell;
cells.CHFJPY.onclick = updateStrengthCell;

//-------------------ALARM CLOCK-------------------------
function getTimeString(hours, minutes, seconds, zone) {
  if (minutes / 10 < 1) minutes = "0" + minutes;
  if (seconds/10 < 1) seconds = "0" + seconds;
  return `${hours}:${minutes}:${seconds} ${zone}`;
}
function renderTime() {
  var currentTime = document.querySelector("#current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = (hours >= 12) ? "PM" : "AM";
  hours = hours % 12;
  const timeString = getTimeString(hours, minutes, seconds, zone);
  currentTime.innerHTML = timeString;
}  setInterval(renderTime, 1000);  // Update time every second

// Strategy tabs
function openStrategyTab(evt, tabID) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabID).style.display = "block";
  evt.currentTarget.className += " active";
}