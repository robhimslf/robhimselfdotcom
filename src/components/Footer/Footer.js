import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {

    render() {
        const year = new Date().getFullYear();

        const LogoGrayFilter = ( props ) => {
            return  <svg className="svg-filter">
                        <filter id="logoGray" colorInterpolationFilters="sRGB" x="0" y="0" height="100%" width="100%">
                            <feColorMatrix type="matrix" values="
                                0.67     0     0     0     0
                                0     0.67     0     0     0
                                0     0     0.67     0     0
                                0     0     0     1     0" />
                        </filter>
                    </svg>;
        };

        return (
            <footer className="rh-footer">
                <div className="container">
                    <div className="col-lg-4 footer-sidebar">
                        <div className="widget clearfix">
                            <div className="widget-center">
                                <LogoGrayFilter />
                                <img srcSet="/assets/img/img_rh-logo.png, /assets/img/img_rh-logo.png 2x" src="/assets/img/img_rh-logo.png" alt="Rob Himself" />
                                <p>Built with &hearts; by Rob Himself with <a href="https://www.gatsbyjs.org/" target="_blank">GatsbyJS</a><br />&copy; Copyright 1982-{ year }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;