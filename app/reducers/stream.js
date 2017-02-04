'use strict';
import {
  ADD_STREAM,
  REMOVE_STREAM,
  CLEAR_STREAMS,
  ACTIVATE_STREAM
} from '../actions/stream';

import createObjectURL from '../browser/createObjectURL';

const initialState = {
  streams: {},
  active: '_me_'
};

export default function stream(state = initialState, action) {
  switch (action.type) {
    case ADD_STREAM:
      var {userId, stream} = action;
      var streams = Object.assign({}, state.streams);
      streams[userId] = {
        stream,
        url: createObjectURL(stream)
      };
      return Object.assign({}, state, {
        streams: streams
      });
    case REMOVE_STREAM:
      var {userId} = action;
      var streams = Object.assign({}, state.streams);
      delete streams[userId];
      return Object.assign({}, state, {
        streams: streams
      });
    case ACTIVATE_STREAM:
      var {userId} = action;
      return Object.assign({}, state, {
        active: userId
      });
    case CLEAR_STREAMS:
      return initialState;
    default:
      return state;
  }
}
