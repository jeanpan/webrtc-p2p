import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { activateStream } from '../actions/stream';

class Action extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioEnabled: true,
      videoEnabled: true
    };
  }

  audio() {
    var streams = this.props.streams;
    var localStream = streams['_me_'].stream;
    this.setState({
      audioEnabled: !(localStream.getAudioTracks()[0].enabled)
    });
    localStream.getAudioTracks()[0].enabled = !(localStream.getAudioTracks()[0].enabled);
  }

  video() {
    var streams = this.props.streams;
    var localStream = streams['_me_'].stream;
    this.setState({
      videoEnabled: !(localStream.getVideoTracks()[0].enabled)
    });
    localStream.getVideoTracks()[0].enabled = !(localStream.getVideoTracks()[0].enabled);
  }

  render() {
    var audioClassName = (this.state.audioEnabled) ? "fa fa-microphone" : "fa fa-microphone-slash";
    var videoClassName = (this.state.videoEnabled) ? "fa fa-eye" : "fa fa-eye-slash";

    return (
      <div className="action-list">
        <div className="action" onClick={this.audio.bind(this)}><i className={audioClassName} aria-hidden="true"></i></div>
        <div className="action" onClick={this.video.bind(this)}><i className={videoClassName} aria-hidden="true"></i></div>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    streams: store.streamState.streams
  };
};

export default connect(mapStateToProps)(Action);
