// Podcast.component.js

import React, { Component } from 'react';

export default class Podcast extends Component {
  render() {
    return (
      <section id="podcast" className="license-section section text-center">
        <div className="container">
          <h2 className="section-title">Podcast</h2>
          <h3>Packages</h3>
          <div className="row justify-content-center">
            <div className="col-md-12 col-sm-12 mb-5">
              <table className="table table-vertical-align table-striped">
                <thead className="thead-light">
                  <tr>
                    <th colSpan="1" style={{width: '25%'}}>
                      <h4>Package</h4>
                    </th>
                    <th colSpan="1" style={{width: '25%'}}>
                      <h4>Price</h4>
                    </th>
                    <th colSpan="1" style={{width: '50%'}}>
                      <h4>Details</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <th>Standard Package</th>
                  <td className="text-center noWordWrap">
                    $200
                  </td>
                  <td className="text-center noWordWrap">
                    3 mins of music, 1 bumper, 2 revisions (Ala cart value: $275)
                  </td>
                </tr>
                <tr>
                  <th>Premium Package</th>
                  <td className="text-center noWordWrap">
                    $275
                  </td>
                  <td className="text-center noWordWrap">
                    Includes Intro and Outro with audio edits, 1 bumper, 4 revisions (Ala cart value: $325)
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <h3>A la Carte</h3>
            <div className="col-md-12 col-sm-12 mb-3 mb-sm-0">
              <table className="table table-vertical-align table-striped">
                <thead className="thead-light">
                  <tr>
                    <th colSpan="1" style={{width: '25%'}}>
                      <h4>Service</h4>
                    </th>
                    <th colSpan="1" style={{width: '25%'}}>
                      <h4>Price</h4>
                    </th>
                    <th colSpan="1" style={{width: '50%'}}>
                      <h4>Details</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <th>Bumper music (up to 15 secs)</th>
                  <td className="text-center noWordWrap">
                    $25
                  </td>
                  <td className="text-center noWordWrap">
                    Includes 2 revisions and instruction sheet on how to edit audio cuts and loop points
                  </td>
                </tr>
                <tr>
                  <th>Intro</th>
                  <td className="text-center noWordWrap">
                    $100
                  </td>
                  <td className="text-center noWordWrap">
                    Includes 2 revisions and instruction sheet on how to edit audio cuts and loop points
                  </td>
                </tr>
                <tr>
                  <th>Outro</th>
                  <td className="text-center noWordWrap">
                    $100
                  </td>
                  <td className="text-center noWordWrap">
                    Includes 2 revisions and instruction sheet on how to edit audio cuts and loop points
                  </td>
                </tr>
                <tr>
                  <th>3 mins music (minimum 3 sections)</th>
                  <td className="text-center noWordWrap">
                    $200
                  </td>
                  <td className="text-center noWordWrap">
                    Includes 2 revisions and instruction sheet on how to edit audio cuts and loop points
                  </td>
                </tr>
                <tr>
                  <th>Custom Request</th>
                  <td className="text-center noWordWrap">
                    Varies
                  </td>
                  <td className="text-center noWordWrap">
                    For music longer than 3 mins, a creative direction discussion and quote will be provided. Includes 2 revisions.
                  </td>
                </tr>
                <tr>
                  <th>Audio Edit Package (Upsell)</th>
                  <td className="text-center noWordWrap">
                    $50
                  </td>
                  <td className="text-center noWordWrap">
                    Edits and bounces the track into sections requested (e.g., 15 sec, 30 sec, Sting ending, looped section). Always a clean transition.
                  </td>
                </tr>
                <tr>
                  <th>Extra Revision</th>
                  <td className="text-center noWordWrap">
                    $25
                  </td>
                  <td className="text-center noWordWrap">
                    Each additional revision beyond the included 2 revisions
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
