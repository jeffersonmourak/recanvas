
import React, { Component } from 'react';

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
        const onClickHandler = () => {
            this.setState(state => ({
                count: state.count + 1,
            }));
        };

        setInterval(onClickHandler, 100);
    }

    /**
     * Render.
     */
    render() {
        const { count } = this.state;

        return (
            <view
                name="red"
                style={{
                    height: 200,
                    backgroundColor: '#ff0000',
                }}
            >
                <view
                    name="green"
                    style={{
                        backgroundColor: '#00ff00',
                        top: 0,
                        left: 10,
                        height: 40,
                    }}
                >
                    {count}
                </view>
            </view>
        );
    }
}

export default App;
