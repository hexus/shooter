var port = 7002;
var cconsole = require('colorize').console;
var sio = require('socket.io');
var Player = require('./shared/Player');
module.exports = function(users){
	var io = sio.listen(port,{log:false},function(){
		cconsole.log('#blue[Socket.io] '+port);
	});
	
	io.sockets.on('connection',function(socket){
		var user = new Player({
			
		});
	});
}