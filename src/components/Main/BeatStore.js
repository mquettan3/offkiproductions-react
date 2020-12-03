// BeatStore.component.js

import React, { Component } from 'react';
// import AudioShop from './Audio Shop/AudioFileShop.js'

export default class BeatStore extends Component {
  render() {
    const frame = '<iframe src="https://player.beatstars.com/?storeId=116624" width="100%" height="800" style="max-width:1024px;"> -- none -- </iframe>'
    return (
      <section id="rapbeats" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Beat Store</h2>
              <div dangerouslySetInnerHTML={{__html: frame}} />
          	  {/* <AudioShop /> */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
