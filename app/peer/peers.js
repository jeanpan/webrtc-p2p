import _ from 'lodash';
import Peer from './Peer';
import store from '../store';
import video from '../browser/video.js';
import { addStream, removeStream, clearStreams, playStreams } from '../actions/stream';

var peers = {};

function create({ socket, user, initiator, stream }) {
  console.log('create peer: %s', user.id);

  if (peers[user.id]) {
    destroy(user.id);
  }

  var peer = peers[user.id] = Peer.init({
    initiator: socket.id === initiator,
    stream,
    config: {
      iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
      }, {
        urls: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com'
      }, {
        urls: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808'
      }
    ]}
  });

  peer.once('error', err => {
    console.log('peer: %s, error %s', user.id, err.stack);
    destroy(user.id);
  });

  peer.on('signal', signal => {
    console.log('peer: %s, signal: %o', user.id, signal);
    var payload = { userId: user.id, signal };
    socket.emit('signal', payload);
  });

  peer.once('connect', () => {
    console.log('peer: %s, connect', user.id);
    video.play();
  });

  peer.on('stream', stream => {
    console.log('peer: %s, stream', user.id);
    store.dispatch(addStream(user.id, stream));
  });

  peer.once('close', () => {
    console.log('peer: %s, close', user.id);
    store.dispatch(removeStream(user.id));
    // make sure some other peer with different id didn't take place between
    // calling `destroy()` and `close` event
    if (peers[user.id] === peer) delete peers[user.id];
  });
}

function get(userId) {
  return peers[userId];
}

function getIds() {
  return _.map(peers, (peer, id) => id);
}

function clear() {
  console.log('clear');
  _.each(peers, (_, userId) => destroy(userId));
  peers = {};
}

function destroy(userId) {
  console.log('destroy peer: %s', userId);
  var peer = peers[userId];
  if (!peer) return console.log('peer: %s peer not found', userId);
  peer.destroy();
  delete peers[userId];
}

module.exports = { create, get, getIds, destroy, clear };
