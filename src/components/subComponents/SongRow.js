// AudioFileShop.component.js

import React, { Component } from 'react';

// Custom Styles
import '../../assets/css/audio-file-shop.css';

export default class SongRow extends Component {
  constructor(props) {
    super(props);
    this.handleSongClick = this.handleSongClick.bind(this)
    this.handleLicenseChange = this.handleLicenseChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  handleSongClick() {
    this.props.handleSongClick(this.props.categoryId, this.props.songId);
  }

  handleLicenseChange(event) {
    // Lift State
    this.props.handleLicenseChange(event, this.props.categoryId, this.props.songId);
  }

  handleSelectionChange(event) {
    // Lift State
    this.props.handleSelectionChange(event, this.props.categoryId, this.props.songId);
  }

  render() {
    const license_tier = this.props.licenseTier;
    const isChecked = this.props.selectedForPurchase;
    const songName = this.props.songName;

    return (
      <tr id={songName} className={"song-row playing-" + this.props.isActive.toString()}>
        <th className="song-title" onClick={this.handleSongClick}>{songName}</th>
        <td className="shopping-selection">
          <label>
            <input value="purchase" type="checkbox" onChange={this.handleSelectionChange} checked={isChecked} />
            Select For Purchase
          </label>
          <select name="license-tier" onChange={this.handleLicenseChange} value={license_tier}>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Exclusive">Exclusive</option>
          </select>
        </td>
      </tr>
    )
  }
}
