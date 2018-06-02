import React, { Component } from 'react'
import Link from 'gatsby-link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-pro-solid/faBars'

import './Header.scss';

class Header extends Component {

    toggleSidebar() {
        const sidebarClass = 'rh-sidebar-show'
        let classList = document.querySelector( 'body' ).classList

        if ( !classList.contains( sidebarClass )) {
            classList.add( sidebarClass )
        } else {
            classList.remove( sidebarClass )
        }
    }

    render() {
        const { elem } = this.props;
        const Elem = elem;

        return (
            <header className="rh-header">
                <div className="container">
                    <div className="slot-l">
                        <div className="branding">
                            <Elem className="site-title h4">
                                <Link to="/" rel="home"></Link>
                            </Elem>
                        </div>
                    </div>
                    <div className="slot-r">
                        <ul className="rh-nav rh-actions-list">
                            <li className="rh-action-btn rh-action-sidebar" onClick={ this.toggleSidebar.bind( this )}>
                                <span>
                                    <FontAwesomeIcon icon={ faBars } />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;