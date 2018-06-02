const fs = require( 'fs' );
const path = require( 'path' );
const _ = require( 'lodash' );
const frontMatter = require( 'front-matter' );
const markdownIt = require( 'markdown-it' );

const md = markdownIt({
    html: true,
    linkify: true,
    typographer: false
});

function getPosts( providerOptions, startPath ) {
    const options = providerOptions || {};
    const limit = options.limit || Infinity;
    const markdown = ( typeof options.markdown === 'undefined' ) ? true : options.markdown;
    const postsPath = startPath || path.join( __dirname, '../../src/pages' );
    const postFiles = fs.readdirSync( postsPath );

    let posts = [];

    const source = _.chain( postFiles )
        .sortBy()
        .reverse()
        .take( limit )
        .filter( file => {
            const filePath = path.join( postsPath, file );
            return ( path.extname( filePath ) === '.md' || fs.lstatSync( filePath ).isDirectory() );
        })
        .value();

    source.forEach( file => {
        const filePath = path.join( postsPath, file );

        if ( fs.lstatSync( filePath ).isDirectory() ) {
            posts.concat( getPosts( providerOptions, filePath ));
        }

        const contents = fs.readFileSync( filePath ).toString();
        const metadata = frontMatter( contents );

        posts.push({
            path: filePath,
            contents,
            body: markdown ? md.render( metadata.body ) : null,
            data: metadata.attributes
        });
    });

    return posts;
}

module.exports = getPosts;