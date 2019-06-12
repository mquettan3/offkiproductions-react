// AudioFileShop.component.js

import React, { Component } from 'react';

// Require Axios for HTTP requests
const axios = require('axios');

import SongRow from "./SongRow.js"
import AudioPlayer from "./AudioPlayer.js"

// Custom Styles
import '../../assets/css/audio-file-shop.css';

var serverLocation = "10.0.0.100"
// var serverLocation = "192.168.56.102"

export default class AudioFileShop extends Component {
  constructor(props) {
    super(props);

    this.deepCopyCategorySongStruct = this.deepCopyCategorySongStruct.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.handleMusicListResponse = this.handleMusicListResponse.bind(this);

    this.state = {
      player_state: "paused",
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
    var tempCategorySongStruct = this.deepCopyCategorySongStruct();
    tempCategorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].isActive = false;
    tempCategorySongStruct.categories[categoryId].songs[songId].isActive = true;

    // Update the state of the audio player to "playing" - update duration to be the length of the new song
    this.setState({
      categorySongStruct: tempCategorySongStruct,
      currentCategoryId: categoryId,
      currentSongId: songId,
      player_state: "playing"
    });
  }

  handlePause() {
    // Pause - Update state
    this.setState({player_state: "paused"});
  }

  handlePlay() {
    // Play - Update state
    this.setState({player_state: "playing"});
  }

  handleVolumeChange(e) {
    // Set State - Assign volume
    this.setState({volume: e.target.value});
  }

  handleSeek(progress) {
    // On Seek - Receive progress - Float from 0 to 1
    this.setState({currentTime: this.state.duration * progress });
  }

  handleDurationChange(currentDuration) {
    this.setState({duration: currentDuration});
  }

  handleCurrentTimeChange(time) {
    this.setState({currentTime: time});
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
            <th colSpan="3">{this.state.categorySongStruct.categories[category].name}</th>
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
              albumArtLocation={this.state.categorySongStruct.categories[category].songs[song].albumArtLocation}
            />
          )
        }
      }

      audioPlayer =
        <AudioPlayer
          albumArtLocation={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].albumArtLocation}
          songLocation={this.state.categorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].songLocation}
          playerState={this.state.player_state}
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          volume={this.state.volume}
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleVolumeChange={this.handleVolumeChange}
          handleSeek={this.handleSeek}
          handleDurationChange={this.handleDurationChange}
          handleCurrentTimeChange={this.handleCurrentTimeChange}
        />;
    }
    return (
      <div className="audio-file-shop-wrapper">
        <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/607220478&color=%237d55c7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser"></iframe>
        <div className="music-action">
          <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=sf_link">Buy a Beat</a>
        </div>
        <br />
        <div className="audio-file-shop">
          {audioPlayer}
          <form className="purchase-music-form" onSubmit={this.handleSubmit}>
            <div className="song-category-table">
              <table>
                <tbody>
                    {songTableList}
                </tbody>
              </table>
            </div>
          </form>
        </div>
        <div className="music-action">
          <input className="btn btn-ghost-primary" type="submit" value="Purchase Selected Music!"/>
        </div>
      </div>
    )
  }
}
