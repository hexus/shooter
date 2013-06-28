var colorize = require('colorize');
var cconsole = colorize.console;
var express = require('express');
var app = express();
var socket = require('./server/lib/Socket');
var users = {};

cconsole.log('#cyan[Shooter]');

app.configure(function(){
    app.set('title','Shooter');
});

// Log
app.use(function(req,res,next){
    var d = new Date().toLocaleString().replace(/\sGMT.*/,'');
    cconsole.log("#green[%s] - #magenta[%s] - %s %s",d,req.ip,req.method,req.url);
    next();
});

// Server time
app.use('/date',function(req,res,next){
    res.send(''+new Date().getTime());
});

// Shared classes
app.use('/js/shared',express.static(__dirname+'/server/lib/shared'));

// Static client files
app.use(express.static(__dirname+'/client'));

// Boot
app.listen(80,function(){
    cconsole.log('#green[HTTP] 80');
    var Game = require('./server/lib/shared/Game');
    var g = new Game();
});

socket();
