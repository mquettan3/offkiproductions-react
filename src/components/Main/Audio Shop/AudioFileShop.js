// AudioFileShop.component.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";

// Require Axios for HTTP requests
const axios = require('axios');

import SongRow from "./SongRow.js"
import AudioPlayer from "./AudioPlayer.js"

// Custom Styles
import '../../../assets/css/audio-file-shop.css';

var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

// TODO: On initial load, the first song that is selected is not highlighted.

class AudioFileShop extends Component {
  constructor(props) {
    super(props);

    this.deepCopyCategorySongStruct = this.deepCopyCategorySongStruct.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLicenseChange = this.handleLicenseChange.bind(this);
    this.handleMusicListResponse = this.handleMusicListResponse.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.routeToCheckout = this.routeToCheckout.bind(this);

    this.state = {
      player_state: "paused",
      currentTime: 0,
      duration: 0,
      volume: 100,
      categorySongStruct: null,
      currentCategoryId: 0,
      currentSongId: 0,
      shoppingCart: [],
      checkedPaypal: true,
      checkedCard: false,
      showPayPal: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    // Request for names of all categories/songs.  Structure it somehow that makes sense.
    axios.get(serverLocation + '/files/musiclist')
      .then(this.handleMusicListResponse)
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  handleMusicListResponse(response) {
      // handle success
      var categoryIndex = 0;
      var tempCategorySongStruct = {categories: []}

      // Parse the response
      for(var property in response.data) {
        tempCategorySongStruct.categories[categoryIndex] = {name: property, songs: []};
        for(var index in response.data[property]) {
          var albumArtName = response.data[property][index].split(".").slice(0, -1).join('.') + ".jpg";
          tempCategorySongStruct.categories[categoryIndex].songs.push({
            name: response.data[property][index],
            category: property,
            songLocation: serverLocation + '/files/samplemusic/' + property + "/" + response.data[property][index],
            albumArtLocation: serverLocation + '/files/albumart/' + property + "/" + albumArtName,
            isActive: false,
            licenseTier: "None",
            selectedForPurchase: false
          });
        }

        categoryIndex += 1;
      }

      tempCategorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].isActive = true;

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

    // If you clicked the song that's already selected.  Toggle Play/Pause.
    if(categoryId === this.state.currentCategoryId && songId === this.state.currentSongId) {
      if (this.state.player_state === "paused") {
        this.setState({player_state: "playing"});
      } else if (this.state.player_state === "playing") {
        this.setState({player_state: "paused"});
      }
    } else {
      // Update the state of the audio player to "playing" - update duration to be the length of the new song
      this.setState({
        categorySongStruct: tempCategorySongStruct,
        currentCategoryId: categoryId,
        currentSongId: songId,
        player_state: "playing"
      });
    }

    let item = tempCategorySongStruct.categories[categoryId].songs[songId];

    // Inform Server of song play
    axios.post(serverLocation + '/analytics/played/', 
    {
      name: item.name,
      category: item.category
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  handleCategoryClick(e) {
    e.preventDefault();
    if(e.currentTarget.classList.value.includes("collapsed")) {
        e.currentTarget.querySelector(".collapse-icon").setAttribute('data-icon', 'angle-down')
        e.currentTarget.classList.toggle("collapsed")
    } else {
        e.currentTarget.querySelector(".collapse-icon").setAttribute('data-icon', 'angle-up')
        e.currentTarget.classList.toggle("collapsed")
    }

    let x = document.getElementsByClassName("song-list-" + e.currentTarget.id.toString());
    x[0].classList.toggle("d-none");
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
    // On Seek - Play - Receive progress - Float from 0 to 1

    // Don't need to do anything but play.  handleDurationChange keeps track of the current time accurately.
    this.setState({player_state: "playing"});
  }

  handleNextSong() {
    // Advance to the next song
    let newSongId = this.state.currentSongId;
    let newCategoryId = this.state.currentCategoryId;

    if(this.state.currentSongId < Object.keys(this.state.categorySongStruct.categories[this.state.currentCategoryId].songs).length - 1) {
      newSongId = this.state.currentSongId + 1;
    } else {
      newSongId = 0;
      if(this.state.currentCategoryId < Object.keys(this.state.categorySongStruct.categories).length - 1) {
        newCategoryId = this.state.currentCategoryId + 1;
      } else {
        newCategoryId = 0;
      }
    }

    var tempCategorySongStruct = this.deepCopyCategorySongStruct();
    tempCategorySongStruct.categories[this.state.currentCategoryId].songs[this.state.currentSongId].isActive = false;
    tempCategorySongStruct.categories[newCategoryId].songs[newSongId].isActive = true;
    
    // Inform Server of song play
    let item = tempCategorySongStruct.categories[newCategoryId].songs[newSongId];
    axios.post(serverLocation + '/analytics/played/', 
    {
      name: item.name,
      category: item.category
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    this.setState({currentSongId: newSongId, currentCategoryId: newCategoryId, categorySongStruct: tempCategorySongStruct});
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

    let item = tempCategorySongStruct.categories[categoryId].songs[songId];

    if(event.target.value !== "None") {
      // Inform Server of song add_to_cart
      axios.post(serverLocation + '/analytics/added_to_cart/', 
      {
        name: item.name,
        category: item.category
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }

    // Update State
    this.setState({
      categorySongStruct: tempCategorySongStruct,
      showPayPal: false
    });
  }

  handleSubmit(e) {
    var shoppingCart = [];

    for(let category in this.state.categorySongStruct.categories) {
      for(let song in this.state.categorySongStruct.categories[category].songs) {
        if (this.state.categorySongStruct.categories[category].songs[song].licenseTier !== "None") {
          var licenseTier = this.state.categorySongStruct.categories[category].songs[song].licenseTier;
          var songName = this.state.categorySongStruct.categories[category].songs[song].name.split(".").slice(0, -1).join('.');
          var categoryName = this.state.categorySongStruct.categories[category].name;
          var cost = "0";

          if (licenseTier === "Basic") {
            cost = "30"
          } else if (licenseTier === "Premium") {
            cost = "100"
          }

          shoppingCart.push({
            name: songName,
            unit_amount: {
              currency_code: "USD",
              value: cost
            },
            quantity: "1",
            description: "Song Name: " + songName + " - Category Name: " + categoryName + " - License Tier: " + licenseTier,
            sku: "OK" + category + "-" + song + "-" + licenseTier,
            category: "DIGITAL_GOODS"
          });
        }
      }
    }

    if(shoppingCart.length === 0) {
      alert("Please select a song to purchase!");
      e.preventDefault();
    } else {
      shoppingCart.forEach(function (item) {
        // For each song - Inform Server of song add_to_checkout

        // Rebuild the songname with *.mp3 extension.  Rebuild category because item.category is DIGITAL_GOODS
        let tempSongName = item.description.split(" - ")[0].replace("Song Name: ", "") + ".mp3";
        let tempCategoryName = item.description.split(" - ")[1].replace("Category Name: ", "");
        axios.post(serverLocation + '/analytics/added_to_checkout/', 
        {
          name: tempSongName,
          category: tempCategoryName
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
      });
    
      //Route to checkout after updating state
      this.setState({shoppingCart: shoppingCart, showPayPal: true}, this.routeToCheckout);
    }
  }

  routeToCheckout() {
    this.props.history.push({
      pathname: "/checkout",
      state: {
        shoppingCart: this.state.shoppingCart
      }
    })
  }

  render() {
    let songTableList = [];
    let audioPlayer = "";

    if(this.state.categorySongStruct) {
      // Create the Audio table entires based off of what was received from the server, but only if it's been received.

      for(let category in this.state.categorySongStruct.categories) {
        let songList = []        

        for (let song in this.state.categorySongStruct.categories[category].songs) {
          songList.push(
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

        songTableList.push(
          <div key={category} className="category-wrapper">
            <div id={category} className="category-row collapsed" onClick={this.handleCategoryClick}>
              <div className="category-row-content">
                <div className="category-name">{this.state.categorySongStruct.categories[category].name}</div>
                <i className="collapse-icon fas fa-angle-up"></i>
                <span>Select License Tier to Purchase</span>
              </div>
            </div>
            <div className={"song-list-" + category.toString() + " d-none"}>
              {songList}
            </div>
          </div>
        )
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
          handleNextSong={this.handleNextSong}
        />;
    }
    return (
      <div className="audio-file-shop-wrapper">
        <div className="audio-file-shop">
          {audioPlayer}
          <form className="purchase-music-form">
            <div className="song-category-table">
              {songTableList}
            </div>
          </form>
          <p>All "Off Ki Productions" audio tags will be automatically removed after purchase.</p>
        </div>
        <div className="music-action">
          <button className="btn btn-ghost-primary" onClick={this.handleSubmit} >Purchase Selected Music!</button>
        </div>
      </div>
    )
  }
}

export default withRouter(AudioFileShop);