import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { activateStream } from '../actions/stream';

import Action from './action';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  play(event) {
    try {
      event.target.play();
    } catch (e) {
      console.log('error starting video: %s', e.name);
    }
  }

  activate(userId) {
    this.props.dispatch(activateStream(userId));
  }

  render() {
    const { active, streams } = this.props;
    const videos = _.map(streams, (stream, userId) => {
      var url = stream.url;
      var className = 'video-container';
      className += (active === userId) ? ' active' : '';
      return (
        <div className={className} key={userId}>
          <video
            src={url}
            muted={userId === '_me_'}
            onClick={this.activate.bind(this, userId)}
            onLoadedMetadata={this.play}
          />
        </div>
      );
    });

    return (
      <div className="container">
        <Action />
        <div className="video-list">
          {videos}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    streams: store.streamState.streams,
    active: store.streamState.active
  };
};

export default connect(mapStateToProps)(Home);
