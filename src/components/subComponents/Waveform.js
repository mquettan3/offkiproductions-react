// AudioFileShop.component.js

import React, { Component } from 'react';
const wavesurfer = require("wavesurfer");

import WaveformBackground from '../../assets/images/WaveformBackground.png'

// Custom Styles
import '../../assets/css/audio-file-shop.css';

export default class Waveform extends Component {
  constructor(props) {
    super(props);

    this.handleSeek = this.handleSeek.bind(this);
    this.handleNewLoad = this.handleNewLoad.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.resizeWaveform = this.resizeWaveform.bind(this);

    this.state = {loaded: false, waveform: null, previousState: "paused", previousSongLocation: "", previousVolume: 100, togglePlayPauseStyle: ""};
  }

  componentDidMount() {
    var wavesurf = wavesurfer.create({
      container: '#waveform',
      waveColor: 'rgba(68, 0, 153, 0.6)',
      progressColor: '#ad1aac',
      backend: 'MediaElement',
      barWidth: 0,
      cursorWidth: 0,
      height: 100
    });

    this.setState({waveform: wavesurf, loaded: true});

    wavesurfer.on('seek', this.handleSeek);
    wavesurfer.on('audioprocess', this.handleCurrentTimeChange);
    wavesurfer.on('ready', this.handleNewLoad);

    // This adds the responsive nature to the waveform.
    window.addEventListener('resize', this.resizeWaveform);
  }

  resizeWaveform() {
    // Each time the window resizes, empty the canvas then redraw it.
    this.state.waveform.empty();
    this.state.waveform.drawBuffer();
  }

  componentWillUnmount() {
    wavesurfer.unAll();
    window.removeEventListener('resize');
  }

  handleSeek(progress) {
    // On Seek - Pass up progress - Float from 0 to 1
    this.state.waveform.play();
    this.props.handleSeek(progress);
  }

  handleNewLoad() {
    // Every time the duration of the song changes, pass up the value
    var duration = this.state.waveform.getDuration();
    this.props.handleDurationChange(duration);
  }

  handleCurrentTimeChange() {
    // Every time the duration of the song changes, pass up the value
    var time = this.state.waveform.getCurrentTime();
    this.props.handleCurrentTimeChange(time);
  }

  playPauseStopLogic() {
    if (this.state.previousState !== this.props.playerState) {
      switch(this.props.playerState) {
        case "playing":
          this.state.waveform.play();
          this.setState({previousState: "playing", togglePlayPauseStyle: "waveform-playing"});
          break;
        case "paused":
          this.state.waveform.pause();
          this.setState({previousState: "paused", togglePlayPauseStyle: ""});
          break;
        default:
          // do nothing
          break;
      }
    }
  }

  componentDidUpdate() {
    // Each time the song location has updated
    if(this.props.songLocation !== this.state.previousSongLocation) {
  	  this.state.waveform.load(this.props.songLocation);
      this.setState({previousSongLocation: this.props.songLocation, previousState: "paused"});
    }

    if(this.state.previousVolume !== this.props.volume) {
      this.state.waveform.setVolume(this.props.volume / 100);
      this.setState({previousVolume: this.props.volume});
    }

    this.playPauseStopLogic()
  }

  render() {
    var waveformBackgroundStyle = {
      backgroundImage: 'url(' + WaveformBackground + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div className={"waveform-wrapper " + this.state.togglePlayPauseStyle} style={waveformBackgroundStyle}>
        <div id="waveform"></div>
      </div>
    )
  }
}
