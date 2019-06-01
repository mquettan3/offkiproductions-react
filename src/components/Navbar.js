// Navbar.component.js

import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <header id="header" class="header fixed-top">
        <nav class="main-nav navbar navbar-expand-md" role="navigation">
          <button class="navbar-toggler navbar-dark " type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="toggle-title">Menu</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="navbar-collapse" class="navbar-collapse collapse text-center justify-content-center">
            <ul class="nav navbar-nav">
              <li class="nav-item"><a class="active nav-link scrollto" href="#promo">Home</a></li>
              <li class="nav-item"><a class="nav-link scrollto" href="#rapbeats">Beat Store</a></li>
              <li class="nav-item"><a class="nav-link scrollto" href="#custommusic">You Type Beats!</a></li>
              <li class="nav-item"><a class="nav-link scrollto" href="#license">License Terms</a></li>
              <li class="nav-item"><a class="nav-link scrollto" href="#about">Vision</a></li>
              <li class="nav-item"><a class="nav-link scrollto" href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
