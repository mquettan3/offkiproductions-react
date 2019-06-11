// AudioFileShop.component.js

import React, { Component } from 'react';
import Waveform from './Waveform.js'

// Custom Styles
import '../../assets/css/audio-file-shop.css';

// Fuction for getting timer out of a flat seconds-based duration counter
function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  } else {
    return "0:00"
  }
}

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
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

  handleDurationChange(e) {
    // Seek to where user clicked.
    this.props.handleDurationChange(e);
  }

  handleSeek(e) {
    // Seek to where user clicked.
    this.props.handleSeek(e);
  }

  handleCurrentTimeChange(time) {
    this.props.handleCurrentTimeChange(time);
  }

  render() {
    var playPauseButton = ""
    if (this.props.playerState !== "playing") {
      playPauseButton = <button className="play-button" onClick={this.handlePlay}>Play</button>
    } else {
      playPauseButton = <button className="pause-button" onClick={this.handlePause}>Pause</button>
    }

    const volumeWidth = {width: this.props.volume + "%"};

    return (
      <div className="audio-player">
        <div className="album-art">
          <img src={this.props.albumArtLocation} alt="AlbumArt"/>
        </div>
        <div className="audio-player-controls">
          {playPauseButton}
          <button className="stop-button" onClick={this.handleStop}>Stop</button>
          <span className="current-time">{getTime(this.props.currentTime)}</span>
          <span className="time-separator">/</span>
          <span className="duration">{getTime(this.props.duration)}</span>
          <Waveform
            songLocation={this.props.songLocation}
            playerState={this.props.playerState}
            volume={this.props.volume}
            handleSeek={this.handleSeek}
            handleDurationChange={this.handleDurationChange}
            handleCurrentTimeChange={this.handleCurrentTimeChange}
          />
          <div className="volume">
            <i className="fa fa-volume-down"></i>
            <input className="slider" type="range" min="0" max="100" step="1" onChange={this.handleVolumeChange} value={this.props.volume} />
            <div className="slider-min" style={volumeWidth} />
        		<i className="fa fa-volume-up"></i>
          </div>
        </div>
      </div>
    )
  }
}
