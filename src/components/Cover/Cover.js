import React, { Component } from 'react';
import get from 'lodash/get';

import Post from '../Post/Post';

import './Cover.scss';

class Cover extends Component {
    
    constructor( props ) {
        super( props );

        this.state = {
            height: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind( this );
    }

    componentDidMount() {
        this.updateWindowDimensions();
        if ( typeof window !== 'undefined' ) {
            window.addEventListener( 'resize', this.updateWindowDimensions );
        }
    }

    componentWillUnmount() {
        if ( typeof window !== 'undefined' ) {
            window.removeEventListener( 'resize', this.updateWindowDimensions );
        }
    }

    updateWindowDimensions() {
        if ( typeof window !== 'undefined' ) {
            this.setState({
                height: window.innerHeight + 100
            });
        }
    }

    getAccent() {
        const { accent, post } = this.props;

        if ( typeof accent === 'string' && accent !== '' ) {
            return accent;
        } else if ( typeof post === 'object' && post !== null ) {
            const { node } = post;
            return get( node, 'frontmatter.accent' ) || 'red';
        }

        return 'red';
    }

    render() {
        const { post } = this.props;
        const { height } = this.state;
        const accent = this.getAccent();
        const hasPost = ( typeof post === 'object' && post !== null );

        const heightStyle = ( hasPost === true )
            ? { height: `${height}px` }
            : {};

        return (
            <div className={ `cover ${accent}` + ( hasPost === false ? ' cover-empty' : '' )} style={ heightStyle }>
                { hasPost === true &&
                <div className="cover-wrapper-fixed">
                    <div className="cover-wrap">
                        <div className="cover-item" style={ heightStyle }>
                            <div className="cover-item-container">
                                <Post cover={ true } post={ post } />
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Cover;