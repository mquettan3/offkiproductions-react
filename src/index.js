import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Require Jquery
import './loader.js';

// Bootstrap Styles
import 'bootstrap/dist/css/bootstrap.css';
require('bootstrap');

// Font Awesome important
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Custom Styles
import './assets/css/theme-1.css';

// Load Paypal Script
const scriptElem = document.createElement('script')
// Production
scriptElem.src = 'https://www.paypal.com/sdk/js?client-id=AczEaQP7d-VqHIIsmMRe2wugcUqJiQrD27NucJNOEy_SDCkUXzRMJHpVqvABtyyYBAgJ_R3zyhj-KCwk'
// Sandbox
// scriptElem.src = 'https://www.paypal.com/sdk/js?client-id=AYHNtFj0PqXWC3WwFaJ6MJOggD2M1H3WjDyPvip_y7GLSFCr1qJyvfOVWvbqkmkoC3EY__-UkTIi9wqN'
document.body.appendChild(scriptElem)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
