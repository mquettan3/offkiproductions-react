// BeatStore.component.js

import React, { Component } from 'react';

export default class BeatStore extends Component {
  render() {
    return (
      <section id="rapbeats" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Beat Store</h2>
          	  <iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/607220478&color=%237d55c7&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser"></iframe>
          	  <div className="music-action">
                <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=sf_link">Buy a Beat</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
