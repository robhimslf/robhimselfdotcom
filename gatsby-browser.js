import React, { Component, createElement } from 'react';
import { Transition } from 'react-transition-group';
import createHistory from 'history/createBrowserHistory';
import getTransition from './src/transitions';

const timeout = 400;
const historyExitingEventType = 'history::exiting';

const getUserConfirmation = ( pathname, callback ) => {
    const event = new CustomEvent( historyExitingEventType, { detail: { pathname }});
    window.dispatchEvent( event );
    setTimeout(() => {
        callback( true );
    }, timeout );
};

const history = createHistory({ getUserConfirmation });
history.block(( location, action ) => location.pathname );
exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            exiting: false,
            nextPageResources: {}
        };
        this.listenerHandler = this.listenerHandler.bind( this );
    }

    listenerHandler( event ) {
        const nextPageResources = this.props.loader.getResourcesForPathname(
            event.detail.pathname,
            nextPageResources => this.setState({ nextPageResources })
        ) || {};

        this.setState({
            exiting: true,
            nextPageResources
        });
    }

    componentDidMount() {
        if ( typeof window !== 'undefined' ) {
            window.addEventListener( historyExitingEventType, this.listenerHandler );
        }
    }

    componentWillUnmount() {
        if ( typeof window !== 'undefined' ) {
            window.removeEventListener( historyExitingEventType, this.listenerHandler );
        }
    }

    componentWillReceiveProps( nextProps ) {
        if ( this.props.location.key !== nextProps.location.key ) {
            this.setState({
                exiting: false,
                nextPageResources: {}
            });
        }
    }

    render() {
        const transitionProps = {
            timeout: {
                enter: 0,
                exit: timeout
            },
            appear: true,
            in: !this.state.exiting,
            key: this.props.location.key
        };

        return (
            <Transition { ...transitionProps }>
            {
                ( status ) => createElement( this.props.pageResources.component, {
                    ...this.props,
                    ...this.props.pageResources.json,
                    transition: {
                        status,
                        timeout,
                        style: getTransition({ status, timeout }),
                        nextPageResources: this.state.nextPageResources
                    }
                })
            }
            </Transition>
        );
    }
}

exports.replaceComponentRenderer = ({ props, loader }) => {
    if ( props.layout ) {
        return undefined;
    }

    return createElement( ReplaceComponentRenderer, { ...props, loader });
};