import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-scroll';
import Moment from 'react-moment';
import get from 'lodash/get';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleUp from '@fortawesome/fontawesome-pro-solid/faAngleUp'

import './PostMeta.scss';

class PostMeta extends Component {
    getParsed() {
        const { post } = this.props;

        if ( typeof post === 'undefined' || post === null ) {
            return null;
        } else {
            const node = ( typeof post === 'object' && post !== null &&
                typeof post.node === 'object' && post.node !== null )
                    ? post.node : post;
            const authorUrl = get( node, 'frontmatter.authorUrl' ) || '';

            let info = {
                author: '',
                authorAvatar: '',
                authorUrl: authorUrl.indexOf( 'http' ) === 0 ? authorUrl : false,
                date: ''
            };

            if ( typeof node === 'object' && node !== null ) {
                const plainText = node.html.replace( /<[^>]*>/g, '' );

                info.author = get( node, 'frontmatter.author' ) || '';
                info.authorAvatar = get( node, 'frontmatter.authorAvatar' ) || '';
                info.date = get( node, 'frontmatter.date' ) || null;
            }

            return info;
        }
    }

    render() {
        const post = this.getParsed();

        return (
            <div className="sticky-post-meta">
                <div className="meta-content">
                    <div className="flex-center">
                        <div className="meta-author meta-l">
                            <img src={ post.authorAvatar } className="avatar" />
                            <span className="author-detail">
                                { post.authorUrl && <a href={ post.authorUrl } target="_blank">{ post.author }</a> }
                                { !post.authorUrl && <span className="author-name">{ post.author }</span> }
                                <span className="author-date"><Moment fromNow ago>{ post.date }</Moment> Ago</span>
                            </span>
                        </div>
                        <Link className="meta-c to-top" to="top" isDynamic={ true } spy={ true } smooth={ true }>
                            <span className="to-top-ico">
                                <FontAwesomeIcon icon={ faAngleUp } />
                            </span>
                            <span className="to-top-label">Back to Top</span>
                        </Link>
                        <div className="meta-r" />
                    </div>
                </div>
            </div>
        );
    }
}

export default PostMeta;