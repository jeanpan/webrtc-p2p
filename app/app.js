import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/home';

import video from './browser/video';
import call from './call';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    document.getElementById('app')
  );
  video.play();
}

render();

call.init();
