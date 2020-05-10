// AboutUs.component.js
import React, { Component } from 'react';

// Styles
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Loadable Components
// global.jQuery = require('jquery');
// import $ from 'jquery';
require('bootstrap');
import OwlCarousel from 'react-owl-carousel';

export default class YouTubeCarousel extends Component {
  render() {
    // Content Carousel
    const youTubeCarouselOptions = {
        autoplay: false,
        loop: false,
        rewind: true,
        center: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        items: 1,
        dots: true,  // Hide pagination buttons
        nav: true,   // Show next and prev buttons
        navText: ["<i fill=\"currentColor\" style=\"display: inline-block;\"><svg fill=\"currentColor\" height=\"25\" width=\"10\" viewBox=\"0 0 640 1792\" style=\"display: inline-block; vertical-align: middle;\"><path d=\"M627 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z\"></path></svg></i>", "<i fill=\"currentColor\" style=\"display: inline-block;\"><svg fill=\"currentColor\" height=\"25\" width=\"10\" viewBox=\"0 0 640 1792\" style=\"display: inline-block; vertical-align: middle;\"><path d=\"M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z\"></path></svg></i>"]
    };

    return (
      <section id="youtube" className="youtube-section section text-center">
        <div className="container">
          <h2 className="section-title">YouTube Videos</h2>
          
            <OwlCarousel
                className="content-carousel content-slider"
                {...youTubeCarouselOptions}
            >
                <div className="item">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-sm-30">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/yZfJJfweUA0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-sm-30">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/yZfJJfweUA0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </div>
      </section>
    )
  }
}
