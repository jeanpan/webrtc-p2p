import { combineReducers } from 'redux';
import streamReducer from './stream';

// Combine Reducers
var reducers = combineReducers({
    streamState: streamReducer
});

export default reducers;
