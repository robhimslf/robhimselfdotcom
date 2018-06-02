const _ = require( 'lodash' );
const _string = require( 'underscore.string' );
const fs = require( 'fs' );
const path = require( 'path' );
const { createFilePath } = require( 'gatsby-source-filesystem' );
const GenerateFeeds = require( './util/generate_feeds' );

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise(( resolve, reject ) => {
        const CategoryTemplate = path.resolve( './src/templates/Category.js' );

        resolve(
            graphql(`{
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
                                title
                                author
                                authorUrl
                                path
                                date
                                layout
                                category
                            }
                        }
                    }
                }
            }`)
            .then( result => {
                if ( result.errors ) {
                    reject( result.errors );
                }
                
                const feed = new GenerateFeeds();

                if ( !result.data || !result.data.allMarkdownRemark || result.data.allMarkdownRemark === null ) {
                    return;
                }

                const { edges } = result.data.allMarkdownRemark;

                if ( Array.isArray( edges )) {

                    let categories = [];

                    edges.forEach( edge => {
                        feed.addPost( edge );

                        createPage({
                            path: edge.node.frontmatter.path,
                            component: path.resolve( `./src/templates/${edge.node.frontmatter.layout}.js` )
                        });

                        categories.push( edge.node.frontmatter.category );
                    });

                    categories = _.uniq( categories );
                    _.each( categories, ( category, idx ) => {
                        feed.addCategory( category );

                        createPage({
                            path: `/categories/${_string.slugify( category )}/`,
                            component: CategoryTemplate,
                            context: {
                                category
                            }
                        });
                    });

                    feed.write();
                }
            })
        );
    });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === "build-html") {
        config.loader("null", {
            test: /bad-module/,
            loader: "null-loader",
        });
    }
};