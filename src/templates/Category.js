import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import readingTime from 'reading-time';

import Cover from '../components/Cover/Cover';
import Footer from '../components/Footer/Footer';
import Post from '../components/Post/Post';

class CategoryTemplate extends Component {
    render() {
        const { data, pathContext, transition } = this.props;
        const { category } = pathContext;
        const { edges, totalCount } = data.allMarkdownRemark;
        const siteTitle = data.site.siteMetadata.title;

        return (
            <div style={ transition && transition.style }>
                <Helmet title={ `${category} | ${siteTitle}` } />

                <Cover />
                <div className="rh-faux-bg">
                    <div className="rh-section">
                        <div className="section-head">
                            <h3 className="section-title h6">Category &bull; { category }</h3>
                        </div>
                        <div className="section-content section-content-a">
                            <div className="rh-posts">
                                { edges.map(( post, key ) => (
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

export default CategoryTemplate;

export const categoryTemplateQuery = graphql`
    query blogPostsByCategory( $category: String! ) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            filter: { frontmatter: { category: { eq: $category }}}
            sort: { fields: [ frontmatter___date ], order: DESC }
            limit: 1000
        ) {
            totalCount
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