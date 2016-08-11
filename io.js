var io = require('socket.io')();

var players = {};

// Listen for new connections from clients (socket)
io.on('connection', function(socket) {

  console.log('Client connected to socket.io!');

  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });

  socket.on('clear-circle', function(){
    io.emit('clear-circle');
  })

  socket.on('register-player', function(data) {
    players[data.initials] = true;
    socket.initials = data.initials;
    io.emit('update-player-list', Object.keys(players))
  });

  socket.on('disconnect', function(data) {
    delete players[socket.initials];
    io.emit('update-player-list', Object.keys(players));
  })
});

module.exports = io;
