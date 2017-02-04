'use strict';
import Peer from 'simple-peer';

function init(opts) {
  return Peer(opts);
}

module.exports = { init };
