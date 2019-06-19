// Checkout.component.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

// Require Axios for HTTP requests
const axios = require('axios');

import PayPalButton from "../Main/Audio Shop/PayPalButton.js";

// Custom Styles
// import '../../assets/css/checkout-page.css';
import '../../assets/css/audio-file-shop.css';

var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.createPaymentOrder = this.createPaymentOrder.bind(this);
    this.onPaymentSuccess = this.onPaymentSuccess.bind(this);

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
  }

  createPaymentOrder(data, actions) {
    var totalCost = 0;
    for (let item in this.props.location.state.shoppingCart) {
      totalCost += parseFloat(this.props.location.state.shoppingCart[item].unit_amount.value);
    }
    
    let orderObject = {
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: totalCost,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: totalCost
            }
          }
        },
        description: "You are purchasing from the one and only Off Ki Productions.",
        items: this.props.location.state.shoppingCart,
      }],
      application_context: {
        brand_name: "Off Ki Productions",
        landing_page: "LOGIN",
        shipping_preference: "NO_SHIPPING",
        user_action: "CONTINUE",
        return_url: "http://192.168.56.102:3000",
        cancel_url: "http://192.168.56.102:3000"
      }
    }
    
    return actions.order.create(orderObject);
  }

  onPaymentSuccess(details) {
    // On success, call the server and tell it to email the purchaser with a link for all of their music.
    axios.post('http://' + serverLocation + ':4000/purchaseValidation', {
      orderID: details.orderID,
      payerID: details.payerID
    }).then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
    
        // Do nothing
      });
  }

  render() {
    var payPalStyle = "paypal-buttons-wrapper-showing"

    return (
      <div className="checkout-page-wrapper">
        Welcome to the checkout page!
        <Link to="/">Home</Link>
        <div className={payPalStyle}>
          <PayPalButton
            createOrder={this.createPaymentOrder}
            onApprove={this.onPaymentSuccess}
          />
        </div>
      </div>
    )
  }
}
