// AudioFileShop.component.js

import React, { Component } from 'react';

import FlowTing from "../../assets/audio/samples/Rap Type Beats/Flow Ting.mp3"

import SongRow from "./SongRow.js"
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

export default class AudioFileShop extends Component {
  constructor(props) {
    super(props);

    this.handleSongClick = this.handleSongClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.player = React.createRef();
    this.state = {songLocation: FlowTing, player_state: "stopped", currentTime: 0, duration: 0 };

    // Request for names of all categories/songs.  Structure it somehow that makes sense.
    // A Javascript Map might make sense.  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

    // For each song, update it's location to match the location defined by the API on the server
  }

  componentDidMount() {
    // Continuously update progress
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  handleSongClick(songName) {
    // When the song is clicked.  Update the selected song.  Play the new song.  Update the state of the audio player to "playing"

    // Index into the map using the song name / category name - However it's structured.  Populate the src of the audio ref with the location of the new song.

    // Play the song
    this.player.play();

    // Update the state of the audio player to "playing" - update duration to be the length of the new song
    this.setState({player_state: "playing", duration: this.player.duration})

    console.log(songName);
  }

  handlePause() {
    // Pause - Update state
    this.player.pause();
    this.setState({player_state: "paused"})
  }

  handlePlay() {
    // Play - Update state
    this.player.play();
    this.setState({player_state: "playing"})
  }

  handleStop() {
    // Pause.  Reset progress.
    this.player.pause();
    this.player.currentTime = 0;

    //TODO: Set selected track to whatever was the first one...  Not sure if I want this to be null or not
    this.setState({player_state: "stopped"})
  }

  render() {
    return (
      <div className="temp-wrapper">
    	  <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/607220478&color=%237d55c7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser"></iframe>
    	  <div className="music-action">
          <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=sf_link">Buy a Beat</a>
        </div>

        <div className="audio-file-shop">
          <table>
            <tbody>
              <tr>
                <th colSpan="2" className="AudioPlayer">
                  {this.state.player_state !== "playing" ? (
                    <button className="playButton" onClick={this.handlePlay}>Play</button>
                  ) : (
                    ""
                  )}
                  {this.state.player_state === "playing" ? (
                    <button className="pauseButton" onClick={this.handlePause}>Pause</button>
                  ) : (
                    ""
                  )}
                  <button className="stopButton" onClick={this.handleStop}>Stop</button>
                </th>
              </tr>
              {/* Nested for loop.  For each category - for each song*/}

                {/* For each category, render the category row.*/}
                <tr className="category-row">
                  <th colSpan="2">Rap Type Beats</th>
                </tr>

                {/* For each song within each category, render the song row*/}
                <SongRow songName="Flow Ting" category="Rap Type Beats" handleSongClick={this.handleSongClick} />
            </tbody>
          </table>
          <audio ref={ref => (this.player = ref)} src={this.state.songLocation} controls="controls"/>
        </div>
      </div>
    )
  }
}
