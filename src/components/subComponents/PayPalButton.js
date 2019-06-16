// PayPalButton.component.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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

  componentWillReceiveProps(nextProps) {
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
      }
    }
  }

  render() {
    let PayPalButtonVar = null;
    if(!this.state.showButton)
      return(<div></div>)
    const paypal = window.PAYPAL;
    PayPalButtonVar = paypal.Button.driver('react', { React, ReactDOM });

    const env = "sandbox";
    const CLIENT = {
      sandbox: 'AYHNtFj0PqXWC3WwFaJ6MJOggD2M1H3WjDyPvip_y7GLSFCr1qJyvfOVWvbqkmkoC3EY__-UkTIi9wqN',
      production: 'xxxXXX',
    };

    const payment = () =>
      paypal.rest.payment.create(env, CLIENT, {
        transactions: [
          {
            amount: {
              "0.01"
            }
          },
        ],
      });

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          this.props.onSuccess(payment);
        });

    return(
      <div id="paypal-button-container">
      {this.state.showButton && <PayPalButtonVar
        env={env}
        client={CLIENT}
        onAuthorize={onAuthorize}
        payment={payment}
        />}
      </div>
    )
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PayPalButton)
