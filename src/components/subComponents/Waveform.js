// AudioFileShop.component.js

import React, { Component } from 'react';
const wavesurfer = require("wavesurfer");

// Custom Styles
import '../../assets/css/audio-file-shop.css';

export default class Waveform extends Component {
  constructor(props) {
    super(props);

    this.loadWavesurfer = this.loadWavesurfer.bind(this);

    this.state = {loaded: false, waveform: null};
  }

  componentDidMount() {
    var wavesurf = wavesurfer.create({
      container: '#waveform',
      waveColor: 'black',
      progressColor: 'violet',
      backend: 'MediaElement',
      responsive: true
    });

    wavesurf.load(this.props.songLocation);

    this.setState({waveform: wavesurf, loaded: true);
  }

  loadWavesurfer() {
  }

  render() {
    return (
      <div className="waveform-wrapper">
          <div id="waveform"></div>
      </div>
    )
  }
}
