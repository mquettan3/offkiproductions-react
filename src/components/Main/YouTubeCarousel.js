// AboutUs.component.js
import React, { Component } from 'react';

export default class YouTubeCarousel extends Component {
  render() {
    return (
      <section id="youtube" className="youtube-section section text-center">
        <div className="container">
          <h2 className="section-title">YouTube Videos</h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/yZfJJfweUA0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </section>
    )
  }
}
