import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Moment from 'react-moment';
import get from 'lodash/get';
import readingTime from 'reading-time';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGetPocket from '@fortawesome/fontawesome-free-brands/faGetPocket';

import './Post.scss';

class Post extends Component {

    getParsed() {
        const { post, standalone, cover } = this.props

        if ( typeof post === 'undefined' || post === null ) {
            return null;
        } else {
            const node = ( typeof post === 'object' && post !== null &&
                typeof post.node === 'object' && post.node !== null )
                    ? post.node : post;

            let info = {
                author: '',
                category: '',
                title: '',
                path: '',
                readTime: '',
                letter: '',
                date: '',
                classes: ''
            };

            if ( typeof node === 'object' && node !== null ) {
                const plainText = node.html.replace( /<[^>]*>/g, '' );

                info.author = get( node, 'frontmatter.author' ) || '';
                info.title = get( node, 'frontmatter.title' ) || get( node, 'frontmatter.path' );
                info.date = get( node, 'frontmatter.date' ) || null;
                info.letter = info.title.charAt( 0 ).toUpperCase();
                info.category = get( node, 'frontmatter.category' ) || '';
                info.path = get( node, 'frontmatter.path' );
                info.readTime = readingTime( plainText );

                let classes = [];
                if ( cover ) {
                    classes.push( 'post' );
                } else {
                    classes.push( 'rh-post' );
                }

                classes.push( get( node, 'frontmatter.accent' ) || 'red' );

                if ( !cover && !standalone ) {
                    classes.push( 'rh-layout-a' );
                    info.excerpt = node.excerpt;
                }

                if ( standalone && standalone ) {
                    classes.push( 'standalone' );
                    info.html = node.html;
                }

                info.classes = classes.join( ' ' );
            }

            return info;
        }
    }

    savePost() {
        const post = this.getParsed();
        const fullPath = encodeURIComponent( `https://robhimself.com${post.path}` );
        const pocketPath = `https://getpocket.com/edit?url=${fullPath}`;

        if ( window && typeof window.open === 'function' ) {
            window.open( pocketPath, 'Save For Later', `height=500,width=760,top=${window.innerHeight / 2 - 250},left=${window.innerWidth / 2 - 380},resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0` );
        }
    }

    render() {
        const { standalone, cover } = this.props;
        const post = this.getParsed();

        return (
            <article className={ post.classes }>
                <header className="post-header">
                    { !standalone && <h2 className="post-title h1"><Link to={ post.path }>{ post.title }</Link></h2> }
                    { standalone && <h1 className="post-title h1">{ post.title }</h1> }
                    <div className="post-meta">
                        <div className="meta-item meta-author"><Moment fromNow ago>{ post.date }</Moment> Ago by <span className="author">{ post.author }</span></div>
                        <div className="meta-item meta-category">Filed Under "<Link to={ `/categories/${post.category.toLowerCase()}/` } rel="category">{ post.category }</Link>"</div>
                        <div className="meta-item meta-readtime">{ post.readTime.text }</div>
                    </div>
                    { !cover && <div className="post-letter">{ post.letter }</div> }
                </header>

                { !standalone && !cover &&
                <div className="post-content">
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </div>
                }

                { standalone && standalone &&
                <div className="post-content clearfix" dangerouslySetInnerHTML={{ __html: post.html }} />
                }

                { !standalone &&
                <div className="post-footer">
                    <Link className="rh-btn" to={ post.path }>Read Now</Link>
                    <a onClick={ this.savePost.bind( this ) } className="rh-btn btn-inv rh-rl pocket"><FontAwesomeIcon icon={ faGetPocket } /> Read Later</a>
                </div>
                }

                { cover && cover && <div className="cover-letter">{ post.letter }</div> }
            </article>
        );
    }
}

export default Post;