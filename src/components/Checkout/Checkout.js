// Checkout.component.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

// Require Axios for HTTP requests
const axios = require('axios');

import PayPalButton from "../Main/Audio Shop/PayPalButton.js";
import BasicLicense from "../../assets/license_agreements/Basic Lease Template.pdf"

// Custom Styles
import '../../assets/css/checkout-page.css';

var serverLocation = process.env.REACT_APP_SERVER_LOCATION;

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.createPaymentOrder = this.createPaymentOrder.bind(this);
    this.onPaymentSuccess = this.onPaymentSuccess.bind(this);
    this.basicLicenseChange = this.basicLicenseChange.bind(this);
    this.premiumLicenseChange = this.premiumLicenseChange.bind(this);
    this.exclusiveLicenseChange = this.exclusiveLicenseChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.phoneNumberChange = this.phoneNumberChange.bind(this);
    this.emailChange = this.emailChange.bind(this);

    window.React = React;
    window.ReactDOM = ReactDOM;

    this.state = {
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Telephone",
      email: "Email",
      basicLicenseChecked: false,
      premiumLicenseChecked: false,
      exclusiveLicenseChecked: false
    };
  }

  basicLicenseChange(e) {
    this.setState({basicLicenseChecked: e.target.checked});
  }

  premiumLicenseChange(e) {
    this.setState({premiumLicenseChecked: e.target.checked});
  }

  exclusiveLicenseChange(e) {
    this.setState({exclusiveLicenseChecked: e.target.checked});
  }

  firstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  lastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  phoneNumberChange(e) {
    this.setState({phoneNumber: e.target.value});
  }
  
  emailChange(e) {
    this.setState({email: e.target.value});
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

    var purchaseItems = [];
    var totalCost = 0;
    var subTotal = 0;
    var taxPercentage = 0;

    for(var item in this.props.location.state.shoppingCart) {
      purchaseItems.push(
      <tr key={this.props.location.state.shoppingCart[item].sku}>
        <td className="product"><a href="shop-product.html">{this.props.location.state.shoppingCart[item].name}</a> <small>{this.props.location.state.shoppingCart[item].description}</small></td>
        <td className="price">{"$" + this.props.location.state.shoppingCart[item].unit_amount.value}</td>
        <td className="quantity">
          <div className="form-group">
            <input type="text" className="form-control" value={this.props.location.state.shoppingCart[item].quantity} disabled />
          </div>                      
        </td>
        <td className="amount">{"$" + this.props.location.state.shoppingCart[item].unit_amount.value * this.props.location.state.shoppingCart[item].quantity} </td>
      </tr>
      );

      subTotal += parseInt(this.props.location.state.shoppingCart[item].unit_amount.value, 10) * parseInt(this.props.location.state.shoppingCart[item].quantity, 10);
    }


    totalCost = subTotal + (subTotal * (taxPercentage / 100));
    totalCost = totalCost.toFixed(2);
    subTotal = subTotal.toFixed(2);

    return (
      <div className="checkout-page-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/"><h2><span className="fa fa-angle-double-left"></span> HOME</h2></Link>
              <div className="space-bottom"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Checkout</h1>
              <div className="separator-2"></div>
            </div>
            <table className="table cart">
                <thead>
                  <tr>
                    <th>Product </th>
                    <th>Price </th>
                    <th>Quantity</th>
                    <th className="amount">Total </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseItems}
                  <tr>
                    <td className="total-quantity" colSpan="3">Subtotal</td>
                    <td className="amount">{"$" + totalCost}</td>
                  </tr>
                  <tr>                    
                    <td className="total-quantity" colSpan="2">Taxes</td>
                    <td className="price">{taxPercentage + "%"}</td>
                    <td className="amount">{"$" + (totalCost * (taxPercentage / 100)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="total-quantity" colSpan="3">Total 8 Items</td>
                    <td className="total-amount">{"$" + totalCost}</td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div className="row">
            <div className="col-12">
            <div className="space-bottom"></div>
              <fieldset>
                <legend>Billing Information</legend>
                <form className="form-horizontal">
                  <div className="row">
                    <div className="col-xl-3">
                      <h3 className="title">Personal Info</h3>
                    </div>
                    <div className="col-xl-8 ml-xl-auto">
                      <div className="form-group row">
                        <label htmlFor="billingFirstName" className="col-lg-2 control-label text-lg-right col-form-label">First Name<small className="text-default">*</small></label>
                        <div className="col-lg-10">
                          <input type="text" className="form-control" id="billingFirstName" value={this.state.firstName} onChange={this.firstNameChange} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingLastName" className="col-lg-2 control-label text-lg-right col-form-label">Last Name<small className="text-default">*</small></label>
                        <div className="col-lg-10">
                          <input type="text" className="form-control" id="billingLastName" value={this.state.lastName} onChange={this.lastNameChange}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingTel" className="col-lg-2 control-label text-lg-right col-form-label">Telephone</label>
                        <div className="col-lg-10">
                          <input type="text" className="form-control" id="billingTel" value={this.state.phoneNumber} onChange={this.phoneNumberChange}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingemail" className="col-lg-2 control-label text-lg-right col-form-label">Email<small className="text-default">*</small></label>
                        <div className="col-lg-10">
                          <input type="email" className="form-control" id="billingemail" value={this.state.email} onChange={this.emailChange}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-12 control-label text-lg-right col-form-label"><small className="text-default">*</small>Required Fields</label>
                      </div>
                    </div>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
            <div className="space-bottom"></div>
              <fieldset>
                <legend>License Agreements</legend>
                <form className="form-horizontal">
                  <div className="row">
                    <div className="col-xl-3">
                      <h3 className="title">License Info</h3>
                    </div>
                    <div className="col-xl-8 ml-xl-auto">
                      <div className="form-group row">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="basicLicenseAgreement" checked={this.state.basicLicenseChecked} onChange={this.basicLicenseChange} />
                          <label className="form-check-label" htmlFor="basicLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Basic License Agreement.</b></a></label>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="premiumLicenseAgreement" checked={this.state.premiumLicenseChecked} onChange={this.premiumLicenseChange} />
                          <label className="form-check-label" htmlFor="premiumLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Premium License Agreement.</b></a></label>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="exclusiveLicenseAgreement" checked={this.state.exclusiveLicenseChecked} onChange={this.exclusiveLicenseChange} />
                          <label className="form-check-label" htmlFor="exclusiveLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Exclusive License Agreement.</b></a></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className={payPalStyle}>
                <PayPalButton
                  createOrder={this.createPaymentOrder}
                  onApprove={this.onPaymentSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
