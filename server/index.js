var express = require('express');
var app = express();
var socket = require('socket.io');


var server = app.listen(3001, function(){
   console.log('server is running on port 3001')
});

io = socket(server);

io.on('connection', (socket) => {
   console.log(socket.id, "somebody joined!");
    
   socket.on('join', function(data){
       console.log(data)
       io.emit('newinput', data)
       
});
socket.on('disconnect', function(){
   console.log('user left :(')
})
socket.on('PUSHED_BUTTON', function(){
   socket.broadcast.emit('HE_PUSHED_IT', 'Yo he pushed it')
})

})