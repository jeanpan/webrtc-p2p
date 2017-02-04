export const ADD_STREAM = 'ADD_STREAM';
export const REMOVE_STREAM = 'REMOVE_STREAM';
export const CLEAR_STREAMS = 'CLEAR_STREAMS';
export const PLAY_STREAMS = 'CLEAR_STREAMS';
export const ACTIVATE_STREAM = 'ACTIVATE_STREAM';

export const addStream = (userId, stream) => ({
  type: ADD_STREAM,
  userId,
  stream
});

export const removeStream = (userId) => ({
  type: REMOVE_STREAM,
  userId
});

export const activateStream = (userId) => ({
  type: ACTIVATE_STREAM,
  userId
});

export const clearStreams = () => ({
  type: CLEAR_STREAMS
});
