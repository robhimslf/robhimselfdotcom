import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import readingTime from 'reading-time';

import Cover from '../components/Cover/Cover';
import Footer from '../components/Footer/Footer';
import Post from '../components/Post/Post';
import PostMeta from '../components/PostMeta/PostMeta';

class PostTemplate extends Component {
    render() {
        const { transition } = this.props;
        const post = this.props.data.markdownRemark;
        const siteTitle = get( this.props, 'data.site.siteMetadata.title' );
        const postTitle = post.frontmatter.title;
        const postAccent = post.frontmatter.accent;

        return (
            <div style={ transition && transition.style }>
                <Helmet title={ `${post.frontmatter.title} | ${siteTitle}` } />

                <Cover accent={ postAccent } />
                <div className="rh-faux-bg">
                    <div className="rh-section">
                        <div className="section-content">
                            <Post post={ post } standalone={ true } />
                        </div>
                    </div>
                    <PostMeta post={ post } />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default PostTemplate;

export const postTemplateQuery = graphql`
    query blogPostByPath( $path: String! ) {
        site {
            siteMetadata {
                title
            }
        }
        markdownRemark( frontmatter: { path: { eq: $path }}) {
            id
            html
            frontmatter {
                title
                author
                authorAvatar
                authorUrl
                path
                date
                category
                accent
            }
        }
    }
`;