// AudioFileShop.component.js

import React, { Component } from 'react';
const wavesurfer = require("wavesurfer");

// Custom Styles
import '../../assets/css/audio-file-shop.css';

export default class Waveform extends Component {
  constructor(props) {
    super(props);

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

    this.setState({waveform: wavesurf, loaded: true});
  }

  render() {
    if(this.state.loaded)
    	this.state.waveform.load(this.props.songLocation);

    return (
      <div className="waveform-wrapper">
          <div id="waveform"></div>
      </div>
    )
  }
}
