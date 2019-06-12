// Navbar.component.js

import React, { Component } from 'react';

import Hero1 from "../assets/images/hero-1.jpg"
import MeditatingManSolo from '../assets/images/Logos/MeditatingManSolo.svg';

// Require Axios for HTTP requests
const axios = require('axios');

// var serverLocation = "10.0.0.100"
var serverLocation = "192.168.56.102"

export default class Promo extends Component {
  constructor(props) {
    super(props);

    // Bind all private methods to allow this pointer to be available to them.
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.assignImages = this.assignImages.bind(this);

    // Initializng images with Hero1 here beacuse waiting for the axios.get response took too much time.
    var images = [Hero1]

    // Request from server the full list of files to scroll through
    axios.get('http://' + serverLocation + ':4000/herofiles')
      .then(function (response) {
        // handle success

        // Parse the response
        response.data.forEach(function(value, index) {
          // Skip the first image because the first one is sent along with the React App.  All subsequent images are queried for so this hides the loading.
          if (index !== 0) {
            images.push('http://' + serverLocation + ':4000/herofiles/' + value)
          }
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed

        // Do nothing
      });

      // Assign the initial state
      this.state = { animationRunning: true, width: 0, height: 0, images: images, currentImageIndex: 0, previousImageIndex: 0, intervalId: 0 };

  }

  assignImages(er, files) {
      this.setState({images: files});
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
    // Implement min-height logic carried over from CSS.  width/height absolute numbers from derived CSS breakpoints.
    var height = window.innerHeight;
    var width = window.innerWidth;

    if (width > 510) {
      if (height < 600) {
        height = 600;
      }
    } else {
      if (height < 960) {
        height = 960;
      }
    }

    this.setState({ width: width, height: height});
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
                <embed src={MeditatingManSolo} alt="" />
              </div>
              <h2 className="headline">Off Ki Productions</h2>
              <div className="tagline">We are Dedicated to Enhancing Your Craft!</div>
            </div>
          </div>
          <div className="updates-block">
            <div className="container">
              <div className="updates-block-inner promo-cta-content">
                <h3 className="title">Subscribe to our Newsletter!</h3>
                <div className="desc">
                    <p className="intro">
                        Subscribe to our newsletter and get 50% off your first beat store purchase! This applies to the total amount you buy from the beat store. So you could essentially get a max of 10 beats and get 10 beats FREE! You will also be the first to learn about future deals we are running, new beat early access and more!
                    </p>
                </div> {/* desc */}
                <a className="btn btn-primary btn-cta" href="https://forms.gle/jf6nVfiVQxuFVTR56">Subscribe</a>
              </div> {/* updates-block-inner promo-cta-content */}
            </div> {/* container */}
          </div> {/* updates-block */}
        </div> {/* promo-content-wrapper */}
      </section>
    )
  }
}
