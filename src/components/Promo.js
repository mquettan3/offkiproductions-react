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

    this.state = { width: 0, height: 0, images: [ Hero1, Hero2, Hero3, Hero4 ], imageIndex: 0, intervalId: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.setState({intervalId: setInterval(this.handleTimer, 1000)});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.state.intervalId);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleTimer() {
    if((this.state.imageIndex + 1)  === this.state.images.length) {
      this.setState({imageIndex: 0});
    } else {
      this.setState({imageIndex: this.state.imageIndex + 1});
    }
  }

  render() {
    const sectionStyle = {
      backgroundImage: "url(" + this.state.images[this.state.imageIndex] + ")",
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: this.state.height,
      width: this.state.width,
      backgroundPositionX: "50%",
      backgroundPositionY: "50%",
      padding: "0 0"
    }

    const overlayStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      height: this.state.height,
      width: this.state.width
   }
    
    return (
      <section id="promo" className="promo-section section" style={sectionStyle}>
      <div className="promo-slideshow" style={overlayStyle}>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </section>
    )
  }
}
