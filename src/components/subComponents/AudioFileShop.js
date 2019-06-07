// AudioFileShop.component.js

import React, { Component } from 'react';

import FlowTing from "../../assets/audio/samples/Rap Type Beats/Flow Ting.mp3"
import TakeFlight from "../../assets/audio/samples/R&B Beats/Take Flight.mp3"

import SongRow from "./SongRow.js"
import AudioPlayer from "./AudioPlayer.js"

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

    var tempCategorySongStruct = {categories: []}
    tempCategorySongStruct.categories.push({name: "Rap Type Beats", songs: [{name: "Flow Ting", category: "Rap Type Beats", songLocation: FlowTing, albumArtLocation: "", isActive: false}]});
    tempCategorySongStruct.categories.push({name: "R&B Beats", songs: [{name: "Take Flight", category: "R&B Beats", songLocation: TakeFlight, albumArtLocation: "", isActive: false}]});
    tempCategorySongStruct.categories[0].songs[0].isActive = true;

    this.state = {songLocation: FlowTing, player_state: "stopped", currentTime: 0, duration: 0, categorySongStruct: tempCategorySongStruct, currentCategoryId: 0, currentSongId: 0};
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

  handleSongClick(categoryId, songId) {
    // When the song is clicked.  Update the selected song.  Play the new song.  Update the state of the audio player to "playing"

    // Index into the map using the song name / category name - However it's structured.  Populate the src of the audio ref with the location of the new song.


    this.player.src = this.state.categorySongStruct.categories[categoryId].songs[songId].songLocation;
    // Play the song
    this.player.play();

    var tempState = this.state;
    tempState.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].isActive = false;
    tempState.categorySongStruct.categories[categoryId].songs[songId].isActive = true;
    tempState.currentCategoryId = categoryId;
    tempState.currentSongId = songId;
    tempState.player_state = "playing"
    tempState.duration = this.player.duration

    // Update the state of the audio player to "playing" - update duration to be the length of the new song
    this.setState(tempState)
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
    this.setState({player_state: "stopped", currentTime: 0})
  }

  render() {
    var songTableList = []
    var category = 0;
    var song = 0;
    for(category in this.state.categorySongStruct.categories) {
      songTableList.push(
        <tr key={category} className="category-row">
          <th colSpan="2">{this.state.categorySongStruct.categories[category].name}</th>
        </tr>
      )

      for (song in this.state.categorySongStruct.categories[category].songs) {
        songTableList.push(
          <SongRow key={song + category * 10000} songName={this.state.categorySongStruct.categories[category].songs[song].name} songId={song} categoryName={this.state.categorySongStruct.categories[category].name} categoryId={category} handleSongClick={this.handleSongClick} isActive={this.state.categorySongStruct.categories[category].songs[song].isActive} />
        )
      }
    }
    return (
      <div className="temp-wrapper">
    	  <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/607220478&color=%237d55c7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser"></iframe>
    	  <div className="music-action">
          <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=sf_link">Buy a Beat</a>
        </div>
        <AudioPlayer songLocation={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].songLocation}
        albumArtLocation={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].albumArtLocation}
        playerState={this.state.player_state}
        currentTime={this.state.currentTime}
        duration={this.state.currentDuration}
        handlePlay={this.handlePlay}
        handlePause={this.handlePause}
        handleStop={this.handleStop}
        />
        <audio ref={ref => (this.player = ref)} src={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].songLocation} controls="controls"/>
        <div className="audio-file-shop">
          <table>
            <tbody>
                {songTableList}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
