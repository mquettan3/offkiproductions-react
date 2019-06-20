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
      firstName: {value: "", isValid: false},
      lastName: {value: "", isValid: false},
      phoneNumber: {value: "", isValid: true},
      email: {value: "", isValid: false},
      basicLicenseChecked: {value: false, isValid: false},
      premiumLicenseChecked: {value: false, isValid: false},
      exclusiveLicenseChecked: {value: false, isValid: false},
      showPayPal: false
    };
  }

  basicLicenseChange(e) {
    var valid = false;

    if(e.target.checked) {
      valid = true;
    }
    
    this.setState({basicLicenseChecked: {value: e.target.checked, isValid: valid}});
  }

  premiumLicenseChange(e) {
    var valid = false;

    if(e.target.checked) {
      valid = true;
    }

    this.setState({premiumLicenseChecked:{value: e.target.checked, isValid: valid}});
  }

  exclusiveLicenseChange(e) {
    var valid = false;

    if(e.target.checked) {
      valid = true;
    }

    this.setState({exclusiveLicenseChecked: {value: e.target.checked, isValid: valid}});
  }

  firstNameChange(e) {
    var valid = false;

    if(e.target.value) {
      valid = true;
    }

    this.setState({firstName: {value: e.target.value, isValid: valid}});
  }

  lastNameChange(e) {
    var valid = false;

    if(e.target.value) {
      valid = true;
    }

    this.setState({lastName: {value: e.target.value, isValid: valid}});
  }

  phoneNumberChange(e) {
    // Phone number is not required and this is always valid.
    var valid = true;

    this.setState({phoneNumber: {value: e.target.value, isValid: valid}});
  }
  
  emailChange(e) {
    var valid = false;

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
    {
      valid = true;
    }

    this.setState({email: {value: e.target.value, isValid: valid}});
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
    var purchaseItems = [];
    var licenseItems = [];
    let basicFound = false;
    let premiumFound = false;
    let exclusiveFound = false;
    let showPayPal = false;
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

      if(this.props.location.state.shoppingCart[item].description.search("License Tier: Basic") > 0){
        basicFound = true;
      }

      if(this.props.location.state.shoppingCart[item].description.search("License Tier: Premium") > 0){
        premiumFound = true;
      }

      if(this.props.location.state.shoppingCart[item].description.search("License Tier: Exclusive") > 0){
        exclusiveFound = true;
      }

      subTotal += parseInt(this.props.location.state.shoppingCart[item].unit_amount.value, 10) * parseInt(this.props.location.state.shoppingCart[item].quantity, 10);
    }

    if(this.state.firstName.isValid &&
      this.state.lastName.isValid &&
      this.state.phoneNumber.isValid &&
      this.state.email.isValid &&
      (this.state.basicLicenseChecked.isValid === basicFound) &&
      (this.state.premiumLicenseChecked.isValid === premiumFound) &&
      (this.state.exclusiveLicenseChecked.isValid === exclusiveFound)
     ) {
       showPayPal= true;
     } else {
      showPayPal= false;
     }

    
    let payPalStyle = "paypal-buttons-wrapper-hidden"
    if (showPayPal) {
      payPalStyle = "paypal-buttons-wrapper-showing"
    }

    if(basicFound) {
      licenseItems.push(
      <div key="basicLicense" className="form-group row">
        <div className="form-check form-check-inline">
          <input className={"form-check-input " + (this.state.basicLicenseChecked.isValid ? "is-valid" : "is-invalid") } type="checkbox" id="basicLicenseAgreement" checked={this.state.basicLicenseChecked.value} onChange={this.basicLicenseChange} />
          <label className="form-check-label" htmlFor="basicLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Basic License Agreement.</b></a></label>
        </div>
      </div>
      );
    }

    if(premiumFound) {
      licenseItems.push(
      <div key="premiumLicense" className="form-group row">
        <div className="form-check form-check-inline">
          <input className={"form-check-input " + (this.state.premiumLicenseChecked.isValid ? "is-valid" : "is-invalid") } type="checkbox" id="premiumLicenseAgreement" checked={this.state.premiumLicenseChecked.value} onChange={this.premiumLicenseChange} />
          <label className="form-check-label" htmlFor="premiumLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Premium License Agreement.</b></a></label>
        </div>
      </div>
      );
    }

    if(exclusiveFound) {
      licenseItems.push(
      <div key="exclusiveLicense" className="form-group row">
        <div className="form-check form-check-inline">
          <input className={"form-check-input " + (this.state.exclusiveLicenseChecked.isValid ? "is-valid" : "is-invalid") } type="checkbox" id="exclusiveLicenseAgreement" checked={this.state.exclusiveLicenseChecked.value} onChange={this.exclusiveLicenseChange} />
          <label className="form-check-label" htmlFor="exclusiveLicenseAgreement"><small className="text-default">**</small>By checking this box, I acknowledge that I have reveiwed and agree to all the license terms described in the <a href={BasicLicense}><b>Off Ki Productions Exclusive License Agreement.</b></a></label>
        </div>
      </div>
      );
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
                          <input type="text" placeholder="First Name" className={"form-control " + (this.state.firstName.isValid ? "is-valid" : "is-invalid") }  id="billingFirstName" value={this.state.firstName.value} onChange={this.firstNameChange} />
                          <div className="invalid-feedback">
                            Enter your first name!
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingLastName" className="col-lg-2 control-label text-lg-right col-form-label">Last Name<small className="text-default">*</small></label>
                        <div className="col-lg-10">
                          <input type="text" placeholder="Last Name" className={"form-control " + (this.state.lastName.isValid ? "is-valid" : "is-invalid") } id="billingLastName" value={this.state.lastName.value} onChange={this.lastNameChange}/>
                          <div className="invalid-feedback">
                            Enter your last name!
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingTel" className="col-lg-2 control-label text-lg-right col-form-label">Telephone</label>
                        <div className="col-lg-10">
                          <input type="text" placeholder="(###) ###-####" className="form-control" id="billingTel" value={this.state.phoneNumber.value} onChange={this.phoneNumberChange}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="billingemail" className="col-lg-2 control-label text-lg-right col-form-label">Email<small className="text-default">*</small></label>
                        <div className="col-lg-10">
                          <input type="email" placeholder="example@gmail.com" className={"form-control " + (this.state.email.isValid ? "is-valid" : "is-invalid") } id="billingemail" value={this.state.email.value} onChange={this.emailChange}/>
                          <div className="invalid-feedback">
                            Enter a valid email address! 
                          </div>
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
                      {licenseItems}
                      <div className="form-group row">
                        <label className="col-lg-12 control-label text-lg-right col-form-label"><small className="text-default">**</small>Required Fields - The order confirmatiton email will include a copy of your agreement(s).</label>
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
