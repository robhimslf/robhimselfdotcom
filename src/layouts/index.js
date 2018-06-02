import React, { Component } from 'react';
import Link from 'gatsby-link';

import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

import 'normalize.css/normalize.css';
import './index.scss';

class Template extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            height: 0
        };

        this.updateWindowScroll = this.updateWindowScroll.bind( this );
        this.updateWindowDimensions = this.updateWindowDimensions.bind( this );
    }

    componentDidMount() {
        this.updateWindowDimensions();
        if ( typeof window !== 'undefined' ) {
            window.addEventListener( 'resize', this.updateWindowDimensions );
            window.addEventListener( 'scroll', this.updateWindowScroll, { passive: true });
        }
    }

    componentWillUnmount() {
        if ( typeof window !== 'undefined' ) {
            window.removeEventListener( 'resize', this.updateWindowDimensions );
            window.removeEventListener( 'scroll', this.updateWindowScroll );
        }
    }

    updateWindowDimensions() {
        if ( typeof window !== 'undefined' ) {
            this.setState({
                height: window.innerHeight
            });
        }
    }

    updateWindowScroll( e ) {
        const preStickyClass = 'rh-pre-sticky-elems';
        const stickyClass = 'rh-sticky-elems';
        const { location } = this.props;
        const { height } = this.state;
        const prethreshold = ( location.pathname === '/' ) ? height + 130 : 130;
        const threshold = ( location.pathname === '/' ) ? height + 220 : 220;

        if ( typeof document !== 'undefined' && typeof window !== 'undefined' ) {
            const isPreSticky = ( window.scrollY >= prethreshold );
            const isSticky = ( window.scrollY > threshold );

            let classList = document.querySelector( 'body' ).classList,
                alreadyPre = classList.contains( preStickyClass ),
                alreadySticky = classList.contains( stickyClass );

            if ( alreadyPre !== isPreSticky ) {
                if ( !classList.contains( preStickyClass )) {
                    classList.add( preStickyClass );
                } else {
                    classList.remove( preStickyClass );
                }
            }

            if ( alreadySticky !== isSticky ) {
                if ( !classList.contains( stickyClass )) {
                    classList.add( stickyClass );
                } else {
                    classList.remove( stickyClass );
                }
            }
        }
    }

    render() {
        const { location, children, data } = this.props;

        const metadata = ( data && data.site && typeof data.site.siteMetadata === 'object' &&
            data.site.siteMetadata !== null ) ? data.site.siteMetadata : null;
        const categories = ( data && data.allMarkdownRemark && Array.isArray( data.allMarkdownRemark.group ))
            ? data.allMarkdownRemark.group : [];
        const elem = ( location.pathname === '/' ) ? 'h1' : 'h3';

        return (
            <div id="top">
                <Header elem={ elem } />
                { children() }
                <Sidebar metadata={ metadata } categories={ categories } />
                <div className="rh-sidebar-overlay" />
            </div>
        );
    }
}

export default Template;

export const rootQuery = graphql`
    query rootQuery {
        site {
            siteMetadata {
                about
                accent
                author
                title
            }
        }
        allMarkdownRemark(
            limit: 1000
        ) {
            group( field: frontmatter___category ) {
                fieldValue
                totalCount
            }
        }
    }
`;