// Checkout.component.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Require Axios for HTTP requests
// const axios = require('axios');

// import PayPalButton from "./PayPalButton.js";

// Custom Styles
// import '../../assets/css/checkout-page.css';

// var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

// TODO: On initial load, the first song that is selected is not highlighted.

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.createPaymentOrder = this.createPaymentOrder.bind(this);
    // this.onPaymentSuccess = this.onPaymentSuccess.bind(this);


    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
  }

  handleSubmit(e) {
    // e.preventDefault();
    // var shoppingCart = [];
    //
    // for(let category in this.state.categorySongStruct.categories) {
    //   for(let song in this.state.categorySongStruct.categories[category].songs) {
    //     if (this.state.categorySongStruct.categories[category].songs[song].licenseTier !== "None") {
    //       var licenseTier = this.state.categorySongStruct.categories[category].songs[song].licenseTier;
    //       var songName = this.state.categorySongStruct.categories[category].songs[song].name.split(".").slice(0, -1).join('.');
    //       var categoryName = this.state.categorySongStruct.categories[category].name;
    //       var cost = "0";
    //
    //       if (licenseTier === "Basic") {
    //         cost = "30"
    //       } else if (licenseTier === "Premium") {
    //         cost = "100"
    //       } else if (licenseTier === "Exclusive") {
    //         cost = "3000"
    //       }
    //
    //       shoppingCart.push({
    //         name: songName,
    //         unit_amount: {
    //           currency_code: "USD",
    //           value: cost
    //         },
    //         quantity: "1",
    //         description: "Song Name: " + songName + " - Category Name: " + categoryName + " - License Tier: " + licenseTier,
    //         sku: "OK" + category + "-" + song + "-" + licenseTier,
    //         category: "DIGITAL_GOODS"
    //       });
    //     }
    //   }
    // }
    //
    // if(shoppingCart.length === 0) {
    //   alert("Please select a song to purchase!");
    // } else {
    //   this.setState({shoppingCart: shoppingCart, showPayPal: true});
    //   console.log("You've opted to purchase" + JSON.stringify(shoppingCart));
    // }

  }

  createPaymentOrder(data, actions) {
    // var totalCost = 0;
    // for (let item in this.state.shoppingCart) {
    //   totalCost += parseFloat(this.state.shoppingCart[item].unit_amount.value);
    // }
    //
    // let orderObject = {
    //   intent: "CAPTURE",
    //   purchase_units: [{
    //     amount: {
    //       currency_code: "USD",
    //       value: totalCost,
    //       breakdown: {
    //         item_total: {
    //           currency_code: "USD",
    //           value: totalCost
    //         }
    //       }
    //     },
    //     description: "You are purchasing from the one and only Off Ki Productions.",
    //     items: this.state.shoppingCart,
    //   }],
    //   application_context: {
    //     brand_name: "Off Ki Productions",
    //     landing_page: "LOGIN",
    //     shipping_preference: "NO_SHIPPING",
    //     user_action: "CONTINUE",
    //     return_url: "http://192.168.56.102:3000",
    //     cancel_url: "http://192.168.56.102:3000"
    //   }
    // }
    //
    // return actions.order.create(orderObject);
  }

  onPaymentSuccess(details) {
    // // On success, call the server and tell it to email the purchaser with a link for all of their music.
    // axios.post('http://' + serverLocation + ':4000/purchaseValidation', {
    //   orderID: details.orderID,
    //   payerID: details.payerID
    // }).then(function (response) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //
    //     // Do nothing
    //   });
  }

  render() {
    // let songTableList = [];
    // let audioPlayer = "";
    // let payPalStyle = "paypal-buttons-wrapper-hidden"
    // if (this.state.showPayPal) {
    //   payPalStyle = "paypal-buttons-wrapper-showing"
    // }

    return (
      <div className="checkout-page-wrapper">
        Welcome to the checkout page!
      </div>
    )
  }
}
