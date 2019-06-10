// AudioFileShop.component.js

import React, { Component } from 'react';

// Custom Styles
import '../../assets/css/audio-file-shop.css';

export default class SongRow extends Component {
  constructor(props) {
    super(props);
    this.handleSongClick = this.handleSongClick.bind(this)
    this.handleLicenseChange = this.handleLicenseChange.bind(this)
  }

  handleSongClick() {
    this.props.handleSongClick(this.props.categoryId, this.props.songId);
  }

  handleLicenseChange(event) {
    // Lift State
    this.props.handleLicenseChange(event, this.props.categoryId, this.props.songId);
  }

  render() {
    const license_tier = this.props.licenseTier;
    const songName = this.props.songName.split(".")[0];

    return (
      <tr id={songName} className={"song-row playing-" + this.props.isActive.toString()}>
        <th className="song-title" onClick={this.handleSongClick}>
          <img src={this.props.albumArtLocation} alt="Album Art" />
          {songName}
        </th>
        <td className="shopping-selection">
          <label>
            Select License Tier to Purchase
            <select name="license-tier" onChange={this.handleLicenseChange} value={license_tier}>
              <option value="None">None</option>
              <option value="Basic">Basic - $30</option>
              <option value="Premium">Premium - $100</option>
              <option value="Exclusive">Exclusive - $3000</option>
            </select>
        </label>
        </td>
      </tr>
    )
  }
}
