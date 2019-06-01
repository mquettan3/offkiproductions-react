import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import './assets/css/theme-1.css';
import Navbar from './components/Navbar.js';
import Promo from './components/Promo.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Promo />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
