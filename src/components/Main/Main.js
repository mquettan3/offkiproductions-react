import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Promo from './Promo.js';
import BeatStore from './BeatStore.js';
// import Exclusive from './Exclusive.js';
// import CustomMusic from './CustomMusic.js';
import YouTubeCarousel from './YouTubeCarousel.js';
// import LicenseTerms from './LicenseTerms.js';
import AboutUs from './AboutUs.js';
import CallToAction from './CallToAction.js';
import Contact from './Contact.js';
import Footer from './Footer.js';
import ReelCrafter from './ReelCrafter.js';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Navbar />
        <Promo />
        <ReelCrafter />
        <BeatStore />
        {/* <Exclusive /> */}
        {/* <CustomMusic /> */}
        {/* <LicenseTerms /> */}
        <AboutUs />
        <CallToAction 
          action_description="Subscribe to our newsletter to be the first to learn about future deals we are running, new beat early access, and more!"
          link="https://forms.gle/jf6nVfiVQxuFVTR56"
          action_name="Subscribe"
        />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default Main;
