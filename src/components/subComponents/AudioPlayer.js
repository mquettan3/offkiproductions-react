// AudioFileShop.component.js

import React, { Component } from 'react';

import FlowTing from "../../assets/audio/samples/Rap Type Beats/Flow Ting.mp3"
import TakeFlight from "../../assets/audio/samples/R&B Beats/Take Flight.mp3"


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

  render() {
    var playPauseButton = ""
    if (this.props.playerState !== "playing") {
      playPauseButton = <button className="playButton" onClick={this.handlePlay}>Play</button>
    } else {
      playPauseButton = <button className="pauseButton" onClick={this.handlePause}>Pause</button>
    }

    return (
      <div className="AudioPlayer">
        {playPauseButton}
        <button className="stopButton" onClick={this.handleStop}>Stop</button>
      </div>
    )
  }
}
