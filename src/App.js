import React, { Component } from 'react';
import Navbar from './components/Navbar.js';
import Promo from './components/Promo.js';
import BeatStore from './components/BeatStore.js';
import CustomMusic from './components/CustomMusic.js';
import LicenseTerms from './components/LicenseTerms.js';
import AboutUs from './components/AboutUs.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Promo />
        <BeatStore />
        <CustomMusic />
        <LicenseTerms />
        <AboutUs />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default App;
