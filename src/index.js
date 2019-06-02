import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './loader.js';
require('bootstrap');
require('vegas');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
