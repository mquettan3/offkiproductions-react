// AudioFileShop.component.js

import React, { Component } from 'react';

// Require Axios for HTTP requests
const axios = require('axios');

import SongRow from "./SongRow.js"
import AudioPlayer from "./AudioPlayer.js"

// Custom Styles
import '../../assets/css/audio-file-shop.css';

var serverLocation = "10.0.0.100"

export default class AudioFileShop extends Component {
  constructor(props) {
    super(props);

    this.deepCopyCategorySongStruct = this.deepCopyCategorySongStruct.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleManualSeek = this.handleManualSeek.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.handleMusicListResponse = this.handleMusicListResponse.bind(this);

    this.player = React.createRef();

    this.state = {
      player_state: "stopped",
      currentTime: 0,
      duration: 0,
      volume: 100,
      categorySongStruct: null,
      currentCategoryId: 0,
      currentSongId: 0
    };
  }

  componentDidMount() {
    // Request for names of all categories/songs.  Structure it somehow that makes sense.
    axios.get('http://' + serverLocation + ':4000/musiclist')
      .then(this.handleMusicListResponse)
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed

        // Set the initial audio source to the first song in the first category
      });

    // Continuously update progress
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });

    // Initialize necessary information as soon as all data is known.
    this.player.addEventListener("loadedmetadata", e => {
      this.setState({
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  handleMusicListResponse(response) {
      // handle success
      var categoryIndex = 0;
      var tempCategorySongStruct = {categories: []}

      // Parse the response
      for(var property in response.data) {
        tempCategorySongStruct.categories[categoryIndex] = {name: property, songs: []};
        for(var index in response.data[property]) {
          var albumArtName = response.data[property][index].split(".")[0] + ".jpg";
          tempCategorySongStruct.categories[categoryIndex].songs.push({
            name: response.data[property][index],
            category: property,
            songLocation: 'http://' + serverLocation + ':4000/samplemusic/' + property + "/" + response.data[property][index],
            albumArtLocation: 'http://' + serverLocation + ':4000/albumart/' + property + "/" + albumArtName,
            isActive: false,
            licenseTier: "None",
            selectedForPurchase: false
          });
        }

        categoryIndex += 1;
      }

      this.setState({categorySongStruct: tempCategorySongStruct});
      this.player.src = this.state.categorySongStruct.categories[0].songs[0].songLocation;
  }

  deepCopyCategorySongStruct() {
    var newObject = Object.assign({}, this.state.categorySongStruct);

    newObject.categories = Object.assign({}, this.state.categorySongStruct.categories);

    for (let category in this.state.categorySongStruct.categories) {
      newObject.categories[category] = Object.assign({}, this.state.categorySongStruct.categories[category]);
      newObject.categories[category].songs = Object.assign({}, this.state.categorySongStruct.categories[category].songs);
      for (let song in this.state.categorySongStruct.categories[category].songs) {
        newObject.categories[category].songs[song] = Object.assign({}, this.state.categorySongStruct.categories[category].songs[song])
      }
    }

    return newObject;
  }

  handleSongClick(categoryId, songId) {
    // When the song is clicked.  Update the selected song.  Play the new song.  Update the state of the audio player to "playing"

    // Index into the map using the song name / category name - However it's structured.  Populate the src of the audio ref with the location of the new song.


    this.player.src = this.state.categorySongStruct.categories[categoryId].songs[songId].songLocation;

    // Play the song
    this.player.play();

    var tempCategorySongStruct = this.deepCopyCategorySongStruct();
    tempCategorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].isActive = false;
    tempCategorySongStruct.categories[categoryId].songs[songId].isActive = true;

    // Update the state of the audio player to "playing" - update duration to be the length of the new song
    this.setState({
      categorySongStruct: tempCategorySongStruct,
      currentCategoryId: categoryId,
      currentSongId: songId,
      player_state: "playing",
      duration: this.player.duration
    });
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

  handleVolumeChange(e) {
    // Set State - Assign volume
    this.setState({volume: e.target.value});
    this.player.volume = this.state.volume / 100;
  }

  handleManualSeek(e) {
    // Determine where within div was clicked.
    // This is done by first determining the total offset from the left of the screen by summing the offets of all parents to each other.

    let totalOffsetLeft = e.currentTarget.offsetLeft;
    let targetParent = e.currentTarget.offsetParent;
    while (targetParent) {
      totalOffsetLeft += targetParent.offsetLeft;
      targetParent = targetParent.offsetParent;
    }

    // Once the total offset is known.  Take the X position of the click.  Subtract the offset.  Divide the X value within the target by the widgth of the target.
    let percentage = (e.clientX - totalOffsetLeft) / e.currentTarget.offsetWidth;

    // Floor to eliminate floating points
    var newTime =  Math.floor(this.state.duration * percentage);

    // Assign new time, play, and update state.
    this.player.currentTime = newTime;
    this.player.play();
    this.setState({currentTime: newTime, player_state: "playing"});
  }

  handleLicenseChange(event, categoryId, songId) {
    // Update State - Deep copy to do this because if not, only references to all objects will be copied and thus the state will change without calling setState.
    var tempCategorySongStruct = this.deepCopyCategorySongStruct();
    tempCategorySongStruct.categories[categoryId].songs[songId].licenseTier = event.target.value;

    // Update State
    this.setState({
      categorySongStruct: tempCategorySongStruct
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let shoppingCart = [];

    for(let category in this.state.categorySongStruct.categories) {
      for(let song in this.state.categorySongStruct.categories[category].songs) {
        if (this.state.categorySongStruct.categories[category].songs[song].licenseTier !== "None") {
          shoppingCart.push({songName: this.state.categorySongStruct.categories[category].songs[song].name,
            category: this.state.categorySongStruct.categories[category].songs[song].category,
            location: this.state.categorySongStruct.categories[category].songs[song].songLocation,
            licenseTier: this.state.categorySongStruct.categories[category].songs[song].licenseTier});
        }
      }
    }

    console.log("You've opted to purchase" + JSON.stringify(shoppingCart));
  }

  render() {
    let songTableList = [];
    let audioPlayer = "";

    if(this.state.categorySongStruct) {
      // Create the Audio table entires based off of what was received from the server, but only if it's been received.

      for(let category in this.state.categorySongStruct.categories) {
        songTableList.push(
          <tr key={category} className="category-row">
            <th colSpan="2">{this.state.categorySongStruct.categories[category].name}</th>
          </tr>
        )

        for (let song in this.state.categorySongStruct.categories[category].songs) {
          songTableList.push(
            <SongRow
              key={song.toString() + category.toString()}
              songName={this.state.categorySongStruct.categories[category].songs[song].name}
              songId={song}
              categoryName={this.state.categorySongStruct.categories[category].name}
              categoryId={category}
              handleSongClick={this.handleSongClick}
              handleLicenseChange={this.handleLicenseChange}
              isActive={this.state.categorySongStruct.categories[category].songs[song].isActive}
            />
          )
        }
      }

      audioPlayer =
        <AudioPlayer
          albumArtLocation={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].albumArtLocation}
          playerState={this.state.player_state}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          volume={this.state.volume}
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleStop={this.handleStop}
          handleVolumeChange={this.handleVolumeChange}
          handleManualSeek={this.handleManualSeek}
        />;
    }
    return (
      <div className="audio-file-shop">
    	  <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/607220478&color=%237d55c7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser"></iframe>
    	  <div className="music-action">
          <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=sf_link">Buy a Beat</a>
        </div>
        {audioPlayer}
        <form className="purchase-music-form" onSubmit={this.handleSubmit}>
          <div className="song-category-table">
            <table>
              <tbody>
                  {songTableList}
              </tbody>
            </table>
          </div>
          <input type="submit" value="Purchase Selected Music!"/>
        </form>
        <div className="tag-credit"><i>Custom Beat Shop by Marcus Quettan</i></div>
        <audio ref={ref => (this.player = ref)} preload="metadata"/>
      </div>
    )
  }
}
