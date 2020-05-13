var MilitaryApplication = require("../../application/militaryApplication");
var app = new MilitaryApplication();
app.readyEvent().then(()=>{app.selectMode(0)})
app.startApplication();
window.app = app;