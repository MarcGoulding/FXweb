
function fetchStrengths() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = receiveStrengths;
  req.open("GET", "/get/strengths", true);
  req.send();
}
function receiveStrengths() {
  if (this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);

  // Do something with strength data
  for (var i=0; i<list.length; i++) {
    console.log(list[i]);
    
  }

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
/*
strength values for each currency pair.
1 = long
-1 = short
0 = range
-2 = error
*/
strengths = {
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
  if (strength >= 4) {
    currencyOutputs.usd.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.usd.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.eur.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.eur.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.gbp.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.gbp.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.aud.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.aud.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.cad.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.cad.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.nzd.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.nzd.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.jpy.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.jpy.style.color = "red";
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
  if (strength >= 4) {
    currencyOutputs.chf.style.color = "green";
  } else if(strength <= -4) {
    currencyOutputs.chf.style.color = "red";
  } else {
    currencyOutputs.chf.style.color = "gray";
  }
}

function changeStrength(value){
  value++;
  if (value > 1){
    value = -1;
  }
  return value;
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

cells.EURUSD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURUSD = changeStrength(strengths.EURUSD);
  /* Change styling to new value */
  switch(strengths.EURUSD){
    case 1:
      cells.EURUSD.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURUSD.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURUSD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPUSD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPUSD = changeStrength(strengths.GBPUSD);
  /* Change styling to new value */
  switch(strengths.GBPUSD){
    case 1:
      cells.GBPUSD.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPUSD.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPUSD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.NZDUSD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.NZDUSD = changeStrength(strengths.NZDUSD);
  /* Change styling to new value */
  switch(strengths.NZDUSD){
    case 1:
      cells.NZDUSD.style.backgroundColor = "green";
      break;
    case -1:
      cells.NZDUSD.style.backgroundColor = "red";
      break;
    case 0:
      cells.NZDUSD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.AUDUSD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.AUDUSD = changeStrength(strengths.AUDUSD);
  /* Change styling to new value */
  switch(strengths.AUDUSD){
    case 1:
      cells.AUDUSD.style.backgroundColor = "green";
      break;
    case -1:
      cells.AUDUSD.style.backgroundColor = "red";
      break;
    case 0:
      cells.AUDUSD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.USDCAD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.USDCAD = changeStrength(strengths.USDCAD);
  /* Change styling to new value */
  switch(strengths.USDCAD){
    case 1:
      cells.USDCAD.style.backgroundColor = "green";
      break;
    case -1:
      cells.USDCAD.style.backgroundColor = "red";
      break;
    case 0:
      cells.USDCAD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.USDCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.USDCHF = changeStrength(strengths.USDCHF);
  /* Change styling to new value */
  switch(strengths.USDCHF){
    case 1:
      cells.USDCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.USDCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.USDCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.USDJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.USDJPY = changeStrength(strengths.USDJPY);
  /* Change styling to new value */
  switch(strengths.USDJPY){
    case 1:
      cells.USDJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.USDJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.USDJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURGBP.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURGBP = changeStrength(strengths.EURGBP);
  /* Change styling to new value */
  switch(strengths.EURGBP){
    case 1:
      cells.EURGBP.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURGBP.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURGBP.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURAUD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURAUD = changeStrength(strengths.EURAUD);
  /* Change styling to new value */
  switch(strengths.EURAUD){
    case 1:
      cells.EURAUD.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURAUD.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURAUD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURCAD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURCAD = changeStrength(strengths.EURCAD);
  /* Change styling to new value */
  switch(strengths.EURCAD){
    case 1:
      cells.EURCAD.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURCAD.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURCAD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURJPY = changeStrength(strengths.EURJPY);
  /* Change styling to new value */
  switch(strengths.EURJPY){
    case 1:
      cells.EURJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURNZD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURNZD = changeStrength(strengths.EURNZD);
  /* Change styling to new value */
  switch(strengths.EURNZD){
    case 1:
      cells.EURNZD.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURNZD.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURNZD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.EURCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.EURCHF = changeStrength(strengths.EURCHF);
  /* Change styling to new value */
  switch(strengths.EURCHF){
    case 1:
      cells.EURCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.EURCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.EURCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPJPY = changeStrength(strengths.GBPJPY);
  /* Change styling to new value */
  switch(strengths.GBPJPY){
    case 1:
      cells.GBPJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPNZD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPNZD = changeStrength(strengths.GBPNZD);
  /* Change styling to new value */
  switch(strengths.GBPNZD){
    case 1:
      cells.GBPNZD.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPNZD.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPNZD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPAUD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPAUD = changeStrength(strengths.GBPAUD);
  /* Change styling to new value */
  switch(strengths.GBPAUD){
    case 1:
      cells.GBPAUD.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPAUD.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPAUD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPCHF = changeStrength(strengths.GBPCHF);
  /* Change styling to new value */
  switch(strengths.GBPCHF){
    case 1:
      cells.GBPCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.GBPCAD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.GBPCAD = changeStrength(strengths.GBPCAD);
  /* Change styling to new value */
  switch(strengths.GBPCAD){
    case 1:
      cells.GBPCAD.style.backgroundColor = "green";
      break;
    case -1:
      cells.GBPCAD.style.backgroundColor = "red";
      break;
    case 0:
      cells.GBPCAD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.AUDNZD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.AUDNZD = changeStrength(strengths.AUDNZD);
  /* Change styling to new value */
  switch(strengths.AUDNZD){
    case 1:
      cells.AUDNZD.style.backgroundColor = "green";
      break;
    case -1:
      cells.AUDNZD.style.backgroundColor = "red";
      break;
    case 0:
      cells.AUDNZD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.AUDCAD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.AUDCAD = changeStrength(strengths.AUDCAD);
  /* Change styling to new value */
  switch(strengths.AUDCAD){
    case 1:
      cells.AUDCAD.style.backgroundColor = "green";
      break;
    case -1:
      cells.AUDCAD.style.backgroundColor = "red";
      break;
    case 0:
      cells.AUDCAD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.AUDCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.AUDCHF = changeStrength(strengths.AUDCHF);
  /* Change styling to new value */
  switch(strengths.AUDCHF){
    case 1:
      cells.AUDCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.AUDCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.AUDCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.AUDJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.AUDJPY = changeStrength(strengths.AUDJPY);
  /* Change styling to new value */
  switch(strengths.AUDJPY){
    case 1:
      cells.AUDJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.AUDJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.AUDJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.NZDCAD.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.NZDCAD = changeStrength(strengths.NZDCAD);
  /* Change styling to new value */
  switch(strengths.NZDCAD){
    case 1:
      cells.NZDCAD.style.backgroundColor = "green";
      break;
    case -1:
      cells.NZDCAD.style.backgroundColor = "red";
      break;
    case 0:
      cells.NZDCAD.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.NZDJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.NZDJPY = changeStrength(strengths.NZDJPY);
  /* Change styling to new value */
  switch(strengths.NZDJPY){
    case 1:
      cells.NZDJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.NZDJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.NZDJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.NZDCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.NZDCHF = changeStrength(strengths.NZDCHF);
  /* Change styling to new value */
  switch(strengths.NZDCHF){
    case 1:
      cells.NZDCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.NZDCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.NZDCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.CADJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.CADJPY = changeStrength(strengths.CADJPY);
  /* Change styling to new value */
  switch(strengths.CADJPY){
    case 1:
      cells.CADJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.CADJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.CADJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.CADCHF.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.CADCHF = changeStrength(strengths.CADCHF);
  /* Change styling to new value */
  switch(strengths.CADCHF){
    case 1:
      cells.CADCHF.style.backgroundColor = "green";
      break;
    case -1:
      cells.CADCHF.style.backgroundColor = "red";
      break;
    case 0:
      cells.CADCHF.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
cells.CHFJPY.addEventListener("click", () => {
  /* Rotate strength value */
  strengths.CHFJPY = changeStrength(strengths.CHFJPY);
  /* Change styling to new value */
  switch(strengths.CHFJPY){
    case 1:
      cells.CHFJPY.style.backgroundColor = "green";
      break;
    case -1:
      cells.CHFJPY.style.backgroundColor = "red";
      break;
    case 0:
      cells.CHFJPY.style.backgroundColor = "yellow";
      break;
  }
  generateStrengthOutput();
});
