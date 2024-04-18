import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BeatStore from './BeatStore.js';
import Navbar from '../Main/Navbar.js';
import CallToAction from '../Main/CallToAction.js';
import Contact from '../Main/Contact.js';
import Footer from '../Main/Footer.js';
import Hero1 from "../../assets/images/hero-1.jpg"

class BeatStorePage extends Component {
  render() {
    return (
      <div className="BeatStorePage">
        <div className="row banner" style={{backgroundImage: "url(" + Hero1 + ")"}}>
            <div className="container">
                <div className="col-12 banner-content">
                    <Link to="/"><h2><span className="fa fa-angle-double-left"></span> RETURN HOME</h2></Link>
                    <div className="separator-2"></div>
                    <p>Here are some examples of our sync licensing tracks. Please email us with any questions or requests. </p>
                </div>
            </div>
        </div>
        <BeatStore />
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

export default BeatStorePage;
