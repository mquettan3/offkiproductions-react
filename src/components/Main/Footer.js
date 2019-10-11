// Footer.component.js

import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-content text-center">
            <div className="copyright">Website Courtesy of <a href="https://marcusquettan.com">Marcus Quettan</a><br />Copyright 2019</div>
          </div>
        </div>
      </footer>
    )
  }
}
