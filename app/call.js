import Promise from 'bluebird';
import getUserMedia from './browser/getUserMedia';
import handshake from './peer/handshake';
import socket from './socket';
import store from './store';
import { addStream } from './actions/stream';

function init() {
  const callId = window.document.getElementById('callId').value;
  Promise.all([connect(), getCameraStream()])
  .spread((_socket, stream) => {
    console.log('initializing peer connection');
    handshake.init(_socket, callId, stream);
  });
}

function connect() {
  return new Promise(resolve => {
    socket.once('connect', () => {
      console.log('socket connected');
      resolve(socket);
    });
    socket.on('disconnect', () => {
      console.log('Server socket disconnected');
    });
  });
}

function getCameraStream() {
  return getUserMedia({ video: true, audio: { sampleSize: 8, echoCancellation: true } })
  .then(stream => {
    console.log('got our media stream:', stream);
    store.dispatch(addStream('_me_', stream));
    return stream;
  })
  .catch((e) => {
    console.log('Could not get access to microphone & camera', e);
  });
}

module.exports = { init };
