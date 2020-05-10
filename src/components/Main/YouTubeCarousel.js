// AboutUs.component.js
import React, { Component } from 'react';

// Require Axios for HTTP requests
const axios = require('axios');

// Styles
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import OwlCarousel from 'react-owl-carousel';
import $ from 'jquery';

var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

export default class YouTubeCarousel extends Component {
    constructor(props){
        super(props);
        this.handleVideoListResponse = this.handleVideoListResponse.bind(this);
        // this.state = {videoList: []}
        this.state = {videoList: ['https://www.youtube.com/embed/B3pCKwgeMoM', 'https://www.youtube.com/embed/B3pCKwgeMoM'], renderCarousel: false}
    }

    componentDidMount() {
        // When Component Mounts, request for the video list.
        // On success, call the server and tell it to email the purchaser with a link for all of their music.
        axios.get(serverLocation + '/files/videolist')
        .then(this.handleVideoListResponse)
        .catch(function (error) {
            // handle error
            console.log(error);
        }.bind(this))
    }

    handleVideoListResponse(response) {
        let tempList = [];
        for(let video in response.data) {
            tempList.push(response.data[video]);
        }

        // handle success
        this.setState({videoList: tempList, renderCarousel: true});
    }
    
  render() {
    // Content Carousel
    const youTubeCarouselOptions = {
        autoplay: false,
        loop: false,
        rewind: true,
        center: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        items: 1,
        dots: true,  // Show pagination buttons
        nav: true,   // Show next and prev buttons
        navText: ["<i fill=\"currentColor\" style=\"display: inline-block;\"><svg fill=\"currentColor\" height=\"25\" width=\"10\" viewBox=\"0 0 640 1792\" style=\"display: inline-block; vertical-align: middle;\"><path d=\"M627 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z\"></path></svg></i>", "<i fill=\"currentColor\" style=\"display: inline-block;\"><svg fill=\"currentColor\" height=\"25\" width=\"10\" viewBox=\"0 0 640 1792\" style=\"display: inline-block; vertical-align: middle;\"><path d=\"M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z\"></path></svg></i>"]
    };

    const itemList = [];

    for(let item in this.state.videoList) {
        itemList.push(
            <div key={item} className="item">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-sm-30">
                            <iframe key={item} width="560" height="315" src={this.state.videoList[item]} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <section id="youtube" className="youtube-section section text-center">
            <div className="container">
                <h2 className="section-title">YouTube Videos</h2>
                {this.state.renderCarousel &&
                <OwlCarousel
                    className="content-carousel content-slider"
                    {...youTubeCarouselOptions}
                >
                    {itemList}
                </OwlCarousel>
                }
            </div>
        </section>
    )
  }
}
