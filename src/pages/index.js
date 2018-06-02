import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import readingTime from 'reading-time';

import Cover from '../components/Cover/Cover';
import Footer from '../components/Footer/Footer';
import Post from '../components/Post/Post';

class BlogIndex extends Component {
    render() {
        const { transition } = this.props;
        const siteTitle = get( this, 'props.data.site.siteMetadata.title' );
        const edges = get( this, 'props.data.allMarkdownRemark.edges' )
        const featured = ( Array.isArray( edges ) && edges.length > 0 )
            ? edges[ 0 ] : null;
        const posts = ( Array.isArray( edges ) && edges.length > 1 )
            ? edges.slice( 1 ) : [];

        return (
            <div className="index" style={ transition && transition.style }>
                <Helmet title={ siteTitle } />

                { featured !== null && <Cover post={ featured } /> }
                <div className="rh-faux-bg">
                    <div className="rh-section">
                        <div className="section-head">
                            <h3 className="section-title h6">The Latest</h3>
                        </div>
                        <div className="section-content section-content-a">
                            <div className="rh-posts">
                                { posts.map(( post, key ) => (
                                    <Post post={ post } key={ key } />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer />                             
                </div>
            </div>
        );
    }
}

export default BlogIndex;

export const indexQuery = graphql`
    query indexQuery {
        site {
            siteMetadata {
                about
                accent
                author
                title
            }
        }
        allMarkdownRemark(
            filter: { frontmatter: { published: { eq: true }}}
            sort: { fields: [frontmatter___date], order: DESC }
            limit: 1000
        ) {
            edges {
                node {
                    excerpt( pruneLength: 235 )
                    html
                    frontmatter {
                        author
                        accent
                        title
                        path
                        date
                        layout
                        category
                    }
                }
            }
        }
    }
`;