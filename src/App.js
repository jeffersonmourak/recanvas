
import React, { Component } from 'react';
import Grid from './components/Grid';
/**
 * App Component.
 */
class App extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.state = {
            count: 0,
        };

        /** On click handler. */
        const onHoverHandler = () => {
            this.setState(state => ({
                count: state.count + 1,
            }));

            console.log(window.getSize());
        };

        this.onHoverHandler = onHoverHandler;
    }

    /**
     * Render.
     */
    render() {
        const { count } = this.state;

        return (
            <Grid />
        );
    }
}

export default App;
