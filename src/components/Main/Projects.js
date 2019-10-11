// Projects.component.js
import React, { Component } from 'react';
import BedOfRosesAlbum from "../../assets/images/BedOfRosesAlbum.jpg"

export default class Projects extends Component {
  render() {
    return (
      <section id="projects" className="projects-section section text-center">
        <div className="container">
          <h2 className="section-title">Projects, Albums, and EPs</h2>
          <div className="album">
            <a href="https://unitedmasters.com/off-ki-productions5885/r/bed-of-roses/Aw2UANNhg369" target="_blank"><img className="album-cover" alt="Bed of Roses Album Cover" src={BedOfRosesAlbum} style={{height: "300px", width: "300px"}}></img></a>
          </div>
          <div className="music-action">
            <a className="btn btn-ghost-primary" href="https://unitedmasters.com/off-ki-productions5885/r/bed-of-roses/Aw2UANNhg369" target="_blank">Click Here to Listen to Bed of Roses!</a>
          </div>
        </div>
      </section>
    )
  }
}
