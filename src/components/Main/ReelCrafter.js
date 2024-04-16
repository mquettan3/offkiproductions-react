// ReelCrafter.component.js

import React, { Component } from 'react';

export default class ReelCrafter extends Component {
  render() {
    const frame = '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://play.reelcrafter.com/embed/24711096-30a2-443e-835f-bab36f901639"></iframe>'
    return (
      <section id="reelcrafter" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Music</h2>
              <div dangerouslySetInnerHTML={{__html: frame}} />
          	  {/* <AudioShop /> */}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
