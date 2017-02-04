'use strict';
const _ = require('lodash');

module.exports = function(socket, io) {

  socket.on('signal', payload => {
    console.log('signal: %s, payload: %o', socket.id, payload);
    io.to(payload.userId).emit('signal', {
      userId: socket.id,
      signal: payload.signal
    });
  });

  socket.on('ready', roomName => {
    if (socket.room) socket.leave(socket.room);
    socket.room = roomName;
    socket.join(roomName);
    socket.room = roomName;

    let users = getUsers(roomName);
    console.log('ready: %s, room: %s, users: %o', socket.id, roomName, users);
    io.to(roomName).emit('users', {
      initiator: socket.id,
      users
    });
  });

  function getUsers(roomName) {
    return _.map(io.sockets.adapter.rooms[roomName].sockets, (_, id) => {
      return { id };
    });
  }

};
