import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Require Jquery
import './loader.js';

// Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css';
require('bootstrap');

// Vegas Styles
import 'vegas/dist/vegas.css';
require('vegas');

// Custom Styles
import './assets/css/theme-1.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
