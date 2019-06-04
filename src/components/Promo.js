// Navbar.component.js

import React, { Component } from 'react';

// import $ from 'jquery';
import Hero1 from '../assets/images/hero-1.jpg';
import Hero2 from '../assets/images/hero-2.jpg';
import Hero3 from '../assets/images/hero-3.jpg';
import Hero4 from '../assets/images/hero-4.jpg';
import MeditatingManSolo from '../assets/images/Logos/MeditatingManSolo.svg';

export default class Promo extends Component {
  constructor(props) {
    super(props);

    this.state = { animationRunning: true, width: 0, height: 0, images: [ Hero1, Hero2, Hero3, Hero4 ], currentImageIndex: 0, previousImageIndex: 0, intervalId: 0, dynamicSlideClassName: "promo-current-slide-end" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.refs.visibleSlide.addEventListener("animationiteration", this.stopAnimation, false);

    this.setState({intervalId: setInterval(this.handleTimer, 8000)});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.state.intervalId);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleTimer() {
    if((this.state.currentImageIndex + 1)  === this.state.images.length) {
      this.setState({currentImageIndex: 0});
    } else {
      this.setState({currentImageIndex: this.state.currentImageIndex + 1});
    }

    if(this.state.currentImageIndex === 0) {
      this.setState({previousImageIndex: this.state.images.length - 1})
    } else {
      this.setState({previousImageIndex: this.state.currentImageIndex - 1})
    }

    // Resume Animation
    this.setState({animationRunning: true})
  }

  stopAnimation() {
    this.setState({animationRunning: false})
  }

  render() {

    var PromoSectionHeight = {
      height: this.state.height,
      width: this.state.width
    }

    var CurrentBackgroundImage = {
      backgroundImage: "url(" + this.state.images[this.state.currentImageIndex] + ")",
      height: this.state.height,
      width: this.state.width
    }

    var PreviousBackgroundImage = {
      backgroundImage: "url(" + this.state.images[this.state.previousImageIndex] + ")",
      height: this.state.height,
      width: this.state.width
    }

    var OverlayStyle = {
      height: this.state.height,
      width: this.state.width
    }

    if(this.state.animationRunning) {
      CurrentBackgroundImage.animationPlayState = 'running';
      CurrentBackgroundImage.animationDirection = 'normal';
    } else {
      CurrentBackgroundImage.animationPlayState = 'paused';
      CurrentBackgroundImage.animationDirection = 'reverse';
    }

    return (
      <section id="promo" className="promo-section" style={PromoSectionHeight}>
        <div className="promo-previous-slide" style={PreviousBackgroundImage}></div>
        <div className="promo-current-slide"  style={CurrentBackgroundImage} ref="visibleSlide"></div>
        <div className="promo-overlay" style={OverlayStyle}></div>
        <div className="promo-progress-bar" />
        <div className="promo-content-wrapper"  style={PromoSectionHeight}>
          <div className="container text-center promo-content">
            <div className="upper-wrapper">
              <div className="logo-holder">
                <img src={MeditatingManSolo} alt="" />
              </div>
              <h2 className="headline">Off Ki Productions</h2>
              <div className="tagline">We are Dedicated to Enhancing Your Craft!</div>
            </div>
          </div>
          <div className="updates-block">
              <div className="container updates-block-inner">
                  <div id="carousel-updates" className="carousel slide" data-ride="carousel" data-interval="6000">
                      <div className="carousel-inner" role="listbox">
                          <div className="carousel-item active">
                              <div className="carousel-content no-media-holder">
                                  <h3 className="title">Subscribe to our Newsletter!</h3>
                                  <div className="desc">
                                      <p className="intro">
                                          Subscribe to our newsletter and get 50% off your first beat store purchase! This applies to the total amount you buy from the beat store. So you could essentially get a max of 10 beats and get 10 beats FREE! You will also be the first to learn about future deals we are running, new beat early access and more!
                                      </p>
                                  </div>
                                  <a className="btn btn-primary btn-cta" href="https://forms.gle/jf6nVfiVQxuFVTR56">Subscribe</a>
                              </div> {/* carousel-content */}
                          </div> {/* carousel-item */}
                      </div> {/* carousel-inner */}
                  </div> {/* carousel-updates */}
              </div> {/* container updates-block-innter */}
          </div> {/* updates-block */}
        </div> {/* promo-content-wrapper */}
      </section>
    )
  }
}
