import React, { Component } from 'react';
import Main from './components/Main/Main.js';
import Checkout from './components/Checkout/Checkout.js';
import PaymentConfirmation from './components/Checkout/PaymentConfirmation.js';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/paymentconfirmation" component={PaymentConfirmation}/>
            <Redirect to={{pathname: "/"}} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
