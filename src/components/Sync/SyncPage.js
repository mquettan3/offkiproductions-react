// PaymentConfirmation.component.js

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Hero1 from "../../assets/images/hero-1.jpg";
import AudioShop from '../Main/Audio Shop/AudioFileShop.js'

// Custom Styles
import '../../assets/css/sync.css';

// Require Axios for HTTP requests
const axios = require('axios');

var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

export default class ErrorPage extends Component {
    constructor(props) {
      super(props);
      
      // Initilaize state as empty - This will be set and filled with all of the syncs in the synclist requested from the server.
      this.state = {
          syncList: []
      }
    }

    componentDidMount() {
        // On Page load
        
        // Make sure we're scrolled to the top.
        window.scrollTo(0,0);

        // Request from the server for all the sync information.
        axios.get(serverLocation + '/files/synclist/')
        .then((response) => {
            this.setState({syncList: response.data});
        })
        .catch(function (error) {
            // handle error
            // console.log(error);

            if(error.response.status === 500) {
                console.error("Server Request Error: " + error.response.data);
            }
        })
    }

    render() {

        // Sort the state array - Decending order (Most recent date is first)
        this.state.syncList.sort((firstEl, secondEl) => {
            if (Date.parse(firstEl.expiration_date) < Date.parse(secondEl.expiration_date)) {
                return 1;
            }

            if (Date.parse(firstEl.expiration_date) > Date.parse(secondEl.expiration_date)) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })

        // Create sync list from state
        let previousMonth = "";
        let previousYear = "";

        let syncListJSX = [];

        for(let entry in this.state.syncList) {
            const tempDate = new Date(this.state.syncList[entry].expiration_date);
            const options = { month: 'long'};
            let currentMonth = new Intl.DateTimeFormat('en-US', options).format(tempDate);
            let currentYear = tempDate.getFullYear();
            let addSeparator = true;

            // If the year or date has changed
            if((currentMonth !== previousMonth) || (currentYear !== previousYear)) {
                // Snap a new month/year title!
                previousMonth = currentMonth;
                previousYear = currentYear;
                addSeparator = false;

                syncListJSX.push(
                    <div key={entry + currentMonth + " " + currentYear} className="row">
                        <div className="col-12">
                            <h2>{currentMonth + " " + currentYear}</h2>
                            <div className="separator-2"></div>
                        </div>
                    </div>
                )
            }

            // Always add new entry to the list
            
            // Assemble the reference track list:
            let referenceTrackList = []
            for(let track in this.state.syncList[entry].reference_track_list) {
                referenceTrackList.push(
                    <a key={track} href={this.state.syncList[entry].reference_track_list[track]} target="_blank">Reference Track {parseInt(track, 10) + 1}</a>
                )
            }

            // Determine if the submit button should be disabled
            let expired = false;
            if(Date.now() > tempDate) {
                expired = true;
            }

            syncListJSX.push(
                <div key={entry} className="row">
                    <div className={addSeparator ? "separator-3" : ""}></div>
                    <div className="col-12 entry">
                        <div className="text-block">
                            <h3>{this.state.syncList[entry].title}</h3>
                            {referenceTrackList}
                            <i>Expiration Date: {this.state.syncList[entry].expiration_date}</i>
                            <p>{this.state.syncList[entry].description}</p>
                        </div>
                        <a className={"btn btn-primary btn-cta " + (expired ? "disabled" : "")} href={"mailto:offki@offkiproductions.com?subject=Off Ki Sync Entry for " + this.state.syncList[entry].title}>Submit Entry</a>
                    </div>
                </div>
            )
        }
        
        return (
            <div className="sync-wrapper">
                <div className="row banner" style={{backgroundImage: "url(" + Hero1 + ")"}}>
                    <div className="container">
                        <div className="col-12 banner-content">
                            <Link to="/"><h2><span className="fa fa-angle-double-left"></span> RETURN HOME</h2></Link>
                            <h1 className="page-title">Sync Opportunities</h1>
                            <div className="separator-2"></div>
                            <p>We’re offering sync opportunities for film, tv, ads and more! Artists and producers who use Off Ki beats or loops and make some magic make sure to send the finished track to us by clicking the “Submit Entry” button below!!! Good luck and keep creating!!!</p>
                        </div>
                    </div>
                </div>
                <div className="container sync-list">
                    <h2 className="section-title text-center">Example Music</h2>
                    <AudioShop />
                </div>
                <div className="container sync-list section">
                    <h2 className="section-title text-center">Open Sync Opportunities</h2>
                    {syncListJSX}
                </div>
            </div>
        )
    }
}
