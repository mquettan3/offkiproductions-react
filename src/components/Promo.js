// Navbar.component.js

import React, { Component } from 'react';
import $ from 'jquery';
import Hero1 from '../assets/images/hero-1.jpg';
import Hero2 from '../assets/images/hero-2.jpg';
import Hero3 from '../assets/images/hero-3.jpg';
import Hero4 from '../assets/images/hero-4.jpg';
import Overlay06 from 'vegas/dist/overlays/06.png';
import MeditatingManSolo from '../assets/images/Logos/MeditatingManSolo.svg';

export default class Promo extends Component {
  componentDidMount(){
    $("#promo").vegas({
        delay: 8000,
        color: '#101113',
        overlay: Overlay06,
        transition: 'zoomOut',
        transitionDuration: 3000,
        slides: [
            { src: Hero1 },
            { src: Hero2 },
            { src: Hero3 },
            { src: Hero4 }
        ]
    });
  }

  render() {
    return (
      <section id="promo" className="promo-section section">
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
      </section>
    )
  }
}
