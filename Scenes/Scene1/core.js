var MilitaryApplication = require("../../application/militaryApplication");
var app = new MilitaryApplication();

app.selectMode(0);

app.startApplication();


// app.selectMode(5);

setTimeout(() => {
   app.selectMode(5) 
}, 10000);