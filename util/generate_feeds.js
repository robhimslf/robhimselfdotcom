const _ = require( 'lodash' );
const _string = require( 'underscore.string' );
const Feed = require( 'feed' );
const fs = require( 'fs' );
const path = require( 'path' );
const gatsbyConfig = require( '../gatsby-config' );

const domain = (process.env.NODE_ENV === `production`)
    ? "https://robhimself.com"
    : "http://localhost:8000";

const rssPath = path.resolve( path.join( __dirname, '../public/rss.xml' ));
const atomPath = path.resolve( path.join( __dirname, '../public/atom.xml' ));

module.exports = class GenerateFeeds {
    constructor() {
        this.feed = new Feed({
            title: gatsbyConfig.siteMetadata.title,
            description: gatsbyConfig.siteMetadata.about,
            id: `${domain}/`,
            link: `${domain}/`,
            image: `${domain}/assets/img/author.png`,
            favicon: `${domain}/favicon.ico`,
            copyright: `(c) Copyright 1982-${(new Date()).getFullYear()} Rob Himself.`,
            feedLinks: {
                json: `${domain}/json`,
                atom: `${domain}/atom`
            },
            author: {
                name: gatsbyConfig.siteMetadata.author,
                link: `${domain}/`
            }
        })
    }

    addPost( edge ) {
        const {
            excerpt,
            html
        } = edge.node;

        const {
            author,
            date,
            path,
            title
        } = edge.node.frontmatter;

        let postDate = Date.parse( date );
        postDate = ( !isNaN( postDate )) ? new Date( postDate ) : null;

        this.feed.addItem({
            title: title,
            id: _string.slugify( title ),
            link: `${domain}${path}`,
            description: excerpt,
            content: html,
            author: [{
                name: author
            }],
            date: postDate
        });
    }

    addCategory( category ) {
        this.feed.addCategory( category );
    }

    write() {
        fs.writeFileSync( rssPath, this.feed.rss2() );
        fs.writeFileSync( atomPath, this.feed.atom1() );
    }
};