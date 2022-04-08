const { Server } = require('socket.io');

module.exports.chatSockets = function (socketServer) {
  const io = new Server(socketServer, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    // console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });

    socket.on('join_room', function (data) {
      // console.log('Joining request received', data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit('user_joined', data);
    });
    socket.on('send_message', function (data) {
      // console.log('aaya', data);
      io.in(data.chatroom).emit('receive_message', data);
    });
  });
};
