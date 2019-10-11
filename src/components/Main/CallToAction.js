import React, { Component } from 'react';

export default class CallToAction extends Component {
    render() {
        return (
            <div className="call-to-action">
                <div className="wrapper">
                    <h3 className="description">{this.props.action_description}</h3>
                    <a href={this.props.link} className="btn btn-primary btn-cta">{this.props.action_name}</a>
                </div>
            </div>
        )
    }
};
