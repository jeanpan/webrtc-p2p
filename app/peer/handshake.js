'use strict';
import _ from 'lodash';
import peers from './peers';

function init(socket, roomName, stream) {

  function createPeer(user, initiator) {
    console.log('createPeer: ' + user);
    return peers.create({ socket, user, initiator, stream });
  }

  socket.on('signal', payload => {
    var peer = peers.get(payload.userId);
    var signal = payload.signal;
    console.log('socket signal, userId: %s, signal: %o', payload.userId, signal);
    if (!peer) return debug('user: %s, no peer found', payload.userId);
    peer.signal(signal);
  });

  socket.on('users', payload => {
    var { initiator, users } = payload;
    console.log('socket users: %o', users);
    users
      .filter(user => !peers.get(user.id) && user.id !== socket.id)
      .forEach(user => createPeer(user, initiator));

    var newUsersMap = _.keyBy(users, 'id');

    peers.getIds()
      .filter(id => !newUsersMap[id])
      .forEach(peers.destroy);
  });

  console.log('socket.id: %s', socket.id);
  console.log('emit ready for room: %s', roomName);
  socket.emit('ready', roomName);
}

module.exports = { init };
