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
    this.state = {license_tier: "Basic", selected_for_purchase: false}
  }

  handleSongClick() {
    this.props.handleSongClick(this.props.categoryId, this.props.songId);
  }

  handleLicenseChange(event) {
    // TODO:  Lift the license and selection state up!  Pass the song name along with it.
    this.setState({license_tier: event.target.value});
  }

  handleSelectionChange(event) {
    // TODO:  Lift the license and selection state up!  Pass the song name along with it.
    this.setState({selected_for_purchase: event.target.checked});
  }

  render() {
    // TODO:  Use the props state for license and selection once state is lifted.
    const license_tier = this.state.license_tier;
    const isChecked = this.state.selected_for_purchase;
    const songName = this.props.songName;
    const uniqueId = this.props.songId.toString() + this.props.categoryId.toString();

    return (
      <tr id={songName} className={"song-row playing-" + this.props.isActive.toString()}>
        <th className="song-title" onClick={this.handleSongClick}>{songName}</th>
        <td className="shopping-selection">
          <input id={"purchaseSong" + uniqueId} value="purchase" type="checkbox" onChange={this.handleSelectionChange} checked={isChecked} />
          <label htmlFor={"purchaseSong" + uniqueId}>Select For Purchase</label>
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
