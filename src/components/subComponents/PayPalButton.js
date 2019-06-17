// PayPalButton.component.js

import React, { Component } from 'react';

// Script Loader
import scriptLoader from 'react-async-script-loader';


class PayPalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: false,
      isScriptLoaded: false
    }
  }

  componentDidMount() {
      const {
        isScriptLoaded,
        isScriptLoadSucceed
      } = this.props;

      if (isScriptLoaded && isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
          !this.state.showButton &&
          !this.props.isScriptLoaded &&
          isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
        const paypal = window.paypal;

        paypal.Buttons({
          createOrder: this.props.createOrder,
          onApprove: this.props.onApprove
        }).render("#paypal-button-container");
      }
    }

    return true;
  }

  render() {
    if(!this.state.showButton)
      return(<div></div>)

    return(
      <div id="paypal-button-container"></div>
    )
  }
}

export default scriptLoader('https://www.paypal.com/sdk/js?client-id=AYHNtFj0PqXWC3WwFaJ6MJOggD2M1H3WjDyPvip_y7GLSFCr1qJyvfOVWvbqkmkoC3EY__-UkTIi9wqN')(PayPalButton)