// PaymentConfirmation.component.js

import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class PaymentConfirmation extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
        return (
            <div className="payment-confirmation">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/"><h2><span className="fa fa-angle-double-left"></span> RETURN HOME</h2></Link>
                            <div className="space-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
