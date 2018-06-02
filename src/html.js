import React from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
    try {
        stylesStr = require(`!raw-loader!../public/styles.css`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = class HTML extends React.Component {
    render() {
        let css
        if (process.env.NODE_ENV === `production`) {
            css = (
                <style
                    id="gatsby-inlined-css"
                    dangerouslySetInnerHTML={{ __html: stylesStr }}
                />
            )
        }
        return (
            <html {...this.props.htmlAttributes}>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="viewport" content="width=device-width,initial-scale=1" />

                    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                    <link rel="alternate" type="application/rss+xml" title="Rob Himself | The personal blog of an interface designer and software engineer. Pushing blood, sweat, and pixels since 1982." href="/rss.xml" />
                    <link rel="alternate" type="application/atom+xml" title="Rob Himself | The personal blog of an interface designer and software engineer. Pushing blood, sweat, and pixels since 1982." href="/atom.xml" />

                    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="assets/img/ico/apple-touch-icon-57x57.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/img/ico/apple-touch-icon-114x114.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/img/ico/apple-touch-icon-72x72.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/img/ico/apple-touch-icon-144x144.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="assets/img/ico/apple-touch-icon-120x120.png" />
                    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="assets/img/ico/apple-touch-icon-152x152.png" />
                    <link rel="icon" type="image/png" href="assets/img/ico/favicon-32x32.png" sizes="32x32" />
                    <link rel="icon" type="image/png" href="assets/img/ico/favicon-16x16.png" sizes="16x16" />
                    <link rel="shortcut icon" href="favicon.ico" />

                    {this.props.headComponents}
                    
                    {css}
                </head>
                <body {...this.props.bodyAttributes}>
                    {this.props.preBodyComponents}
                    <div
                        key={`body`}
                        id="___gatsby"
                        dangerouslySetInnerHTML={{ __html: this.props.body }}
                    />
                    {this.props.postBodyComponents}
                </body>
            </html>
        )
    }
}
