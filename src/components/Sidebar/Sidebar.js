import React, { Component } from 'react';
import Link from 'gatsby-link';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-pro-regular/faTimes';

import './Sidebar.scss';

class Sidebar extends Component {

    getCategories() {
        const { categories } = this.props;
        
        if ( Array.isArray( categories )) {
            return categories.map( c => {
                return { slug: c.fieldValue.toLowerCase(), label: c.fieldValue, count: c.totalCount };
            });
        }

        return [];
    }

    toggleSidebar() {
        const sidebarClass = 'rh-sidebar-show'
        if ( typeof document !== 'undefined' ) {
            let classList = document.querySelector( 'body' ).classList

            if ( !classList.contains( sidebarClass )) {
                classList.add( sidebarClass )
            } else {
                classList.remove( sidebarClass )
            }
        }
    }

    render() {
        const { metadata } = this.props;        
        const categories = this.getCategories();

        const authorName = metadata.author || ''
        const tagline = metadata.about || ''
        const quote = metadata.quote || ''

        return (
            <div className="rh-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-header-wrapper">
                        <div className="branding">
                            <span className="site-title h4">
                                <Link to="/" rel="home"></Link>
                            </span>
                        </div>
                        <span className="sidebar-close" onClick={ this.toggleSidebar.bind( this )}>
                            <FontAwesomeIcon icon={ faTimes } />
                        </span>
                    </div>
                </div>
                <div className="widget sidebar-menu">
                    <ul className="rh-nav rh-main-nav">
                        { categories.map(( cat, key ) => (
                            <li className="menu-item" key={ key }>
                                <Link to={ `/categories/${cat.slug}/` } rel="category">{ cat.label }</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="widget sidebar-author">
                    <h4 className="widget-title h5">{ authorName }</h4>
                    <img src="/assets/img/author.png" className="avatar avatar-90 photo" />
                    <p>{ tagline }</p>
                    <p className="widget-quote" dangerouslySetInnerHTML={{ __html: quote }} />
                </div>
            </div>
        );
    }
}

export default Sidebar;