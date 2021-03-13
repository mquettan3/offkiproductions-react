// PaymentConfirmation.component.js

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Hero1 from "../../assets/images/hero-1.jpg";

// Custom Styles
import '../../assets/css/sync.css';

export default class ErrorPage extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      window.scrollTo(0,0);
    }

    render() {
        
        return (
            <div className="sync-wrapper">
                <div className="row banner" style={{backgroundImage: "url(" + Hero1 + ")"}}>
                    <div className="container">
                        <div className="col-12 banner-content">
                            <Link to="/"><h2><span className="fa fa-angle-double-left"></span> RETURN HOME</h2></Link>
                            <h1 className="page-title">Sync Opportunities</h1>
                            <div className="separator-2"></div>
                            <p>We're offering sync opportuniies for film, tv, ads and more to artists and producers who use Off Ki Beats for loops and make some magic! Send your finished track for us via email with the subject "Off Ki Sync" and if yit fits a sync opporutnity we will pitch it! Below are some current opportunities we have as well as an archive of our past opportunties.</p>
                        </div>
                    </div>
                </div>
                <div className="container sync-list">
                    <div className="row">
                        <div className="col-12">
                            <h2>March 2021</h2>
                            <div className="separator-2"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 2</a>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <i>Expiration Date: 05/20/2022</i>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 2</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 3</a>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>February 2021</h2>
                            <div className="separator-2"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta disabled" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 2</a>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta disabled" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <i>Expiration Date: 05/20/2022</i>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 1</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 2</a>
                                <a href="https://bsta.rs/6aa0a493e">Reference Track 3</a>
                                <p>Description - This is a long description.</p>
                            </div>
                            <a className="btn btn-primary btn-cta disabled" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                        <div className="col-12 entry">
                            <div className="text-block">
                                <h3>Title</h3>
                                <i>Expiration Date: 05/20/2022</i>
                                <p>Description - This is a long deasdscription.</p>
                            </div>
                            <a className="btn btn-primary btn-cta disabled" href="mailto:offki@offkiproductions.com?subject=Off Ki Sync">Submit Entry</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
