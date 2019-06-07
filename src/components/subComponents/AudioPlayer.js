// AudioFileShop.component.js

import React, { Component } from 'react';

// Custom Styles
import '../../assets/css/audio-file-shop.css';

// Reference code for basic audio player:  https://codesandbox.io/s/5y4vjn877x


// Fuction for getting timer out of a flat seconds-based duration counter
function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleManualSeek = this.handleManualSeek.bind(this);

    this.state = {};
    // Request for names of all categories/songs.  Structure it somehow that makes sense.
    // A Javascript Map might make sense.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

    // For each song, update it's location to match the location defined by the API on the server
  }

  handlePause() {
    // Pause
    this.props.handlePause();
  }

  handlePlay() {
    // Play
    this.props.handlePlay();
  }

  handleStop() {
    // Pause.  Reset progress.
    this.props.handleStop();
  }

  handleVolumeChange(e) {
    // Change Volume.
    this.props.handleVolumeChange(e);
  }

  handleManualSeek(e) {
    // Seek to where user clicked.
    this.props.handleManualSeek(e);
  }

  render() {
    var playPauseButton = ""
    if (this.props.playerState !== "playing") {
      playPauseButton = <button className="play-button" onClick={this.handlePlay}>Play</button>
    } else {
      playPauseButton = <button className="pause-button" onClick={this.handlePause}>Pause</button>
    }

    const progressPercentage = (this.props.currentTime / this.props.duration) * 100;
    const progressWidth = (this.props.duration ? {
      width: progressPercentage.toString() + "%"
    } : {
      width: "0%"
    })

    return (
      <div className="audio-player">
        <img className="album-art" src={this.props.albumArtLocation} />
        {playPauseButton}
        <button className="stop-button" onClick={this.handleStop}>Stop</button>
        <span className="current-time">{getTime(this.props.currentTime)}</span>
        <span className="duration">/{getTime(this.props.duration)}</span>
        <div className="progress-bar-wrapper" onClick={this.handleManualSeek}>
          <div className="progress-bar" style={progressWidth}></div>
        </div>
        <input className="volume-slider" type="range" min="0" max="100" step="1" onChange={this.handleVolumeChange} value={this.props.volume} />
      </div>
    )
  }
}
