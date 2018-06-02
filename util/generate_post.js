//import './utils/module_path';

// Usage: npm run generate-post "<title>" ["<category>" "<red,blue,blue-green>" "<author name>" "<author avatar path>" "<author site url>"]
const fs = require( 'fs' );
const path = require( 'path' );
const _string = require( 'underscore.string' );
const moment = require( 'moment' );
const getPosts = require( './utils/get_posts' );
const gatsbyConfig = require( '../gatsby-config' );

const templatePath = path.join( __dirname, 'utils/_post-template.md' );
const template = fs.readFileSync( templatePath ).toString();
const now = new Date();
const date = now.toJSON();
const dateFormat = moment( now ).format( 'YYYY-MM-DD' );

const title = process.argv[ 2 ];
const titleSlug = _string.slugify( title );
const postPath = `/${dateFormat}-${titleSlug}`;
const category = process.argv.length > 3 ? process.argv[ 3 ] : 'General';
const accent = process.argv.length > 4 ? process.argv[ 4 ] : gatsbyConfig.siteMetadata.accent;
const author = process.argv.length > 5 ? process.argv[ 5 ] : gatsbyConfig.siteMetadata.author;

let authorAvatar = `/assets/img/author.png`,
    authorUrl = '"null"';
if ( author !== gatsbyConfig.siteMetadata.author ) {
    authorAvatar = `/assets/img/author-guest-${accent.toLowerCase()}.png`;

    if ( process.argv.length > 5 ) {
        authorAvatar = process.argv[ 5 ];
    }

    if ( process.argv.length > 6 ) {
        authorUrl = process.argv[ 6 ];
    }
}

const posts = getPosts({ limit: 1, markdown: false });
const previousPost = posts.length ? posts[ 0 ] : null;
const previousPostPath = ( previousPost !== null ) ? previousPost.data.path : '';

const newContent = template
    .replace( 'TITLE', title )
    .replace( 'AUTHOR_AVATAR', authorAvatar )
    .replace( 'AUTHOR_URL', authorUrl )
    .replace( 'AUTHOR', author )
    .replace( 'DATE', date )
    .replace( 'PATH', postPath )
    .replace( 'ACCENT', accent )
    .replace( 'CATEGORY', category )
    .replace( 'PREVIOUS', previousPostPath );

const outputDir = path.join( __dirname, `../src/pages/${dateFormat}-${titleSlug}` );
const outputFile = path.join( outputDir, 'index.md' );

if ( !fs.existsSync( outputDir )) {
    fs.mkdirSync( outputDir );
}

fs.writeFileSync( outputFile, newContent );