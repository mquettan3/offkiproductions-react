// BeatStore.component.js

import React, { Component } from 'react';
import AudioShop from './Audio Shop/AudioFileShop.js'

export default class BeatStore extends Component {
  render() {
    return (
      <section id="rapbeats" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Beat Store</h2>
          	  <AudioShop />
              <div className="music-action">
                <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=pp_url">Make an Offer for Exclusive Rights to a Song!</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
