var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

//////////////////////////////////////////////
//            VIEV ENGINE SETUP
//////////////////////////////////////////////
app.set('views', path.join(__dirname, 'HandleErrors'));
app.set('view engine', 'pug');
app.use(logger('dev'));
//////////////////////////////////////////////
//            STATIC FILES
//////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Custom_Modules')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'build')));

///////////////////////////////////////////////////
//  ROUTE INDEX PAGE WHOSE REDIRECT TO MAIN MENU
///////////////////////////////////////////////////
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'MainMenu.html'));
});
///////////////////////////////////////
//          HANDLE ERROR 404
///////////////////////////////////////
app.use(function(req, res, next) {
  next(createError(404));
},function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8000, function () { console.log(' Server listening on https://127.0.0.1:8000!') });

