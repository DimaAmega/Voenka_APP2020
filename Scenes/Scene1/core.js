var MilitaryApplication = require("../../application/militaryApplication");
var app = new MilitaryApplication();
app.selectMode(0);
app.startApplication();
window.app = app;