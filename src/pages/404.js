import React, { Component } from 'react'
import Link from 'gatsby-link'

import Footer from '../components/Footer/Footer';

class NotFound extends Component {
    render() {
        const { transition } = this.props;

        return (
            <div style={ transition && transition.style }>
            </div>
        );
    }
}

export default NotFound;