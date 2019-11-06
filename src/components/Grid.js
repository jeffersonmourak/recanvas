
import React, { Component } from 'react';
import { window } from '../renderer/helper';

// const blockSize = 50;

/**
 * Grid Component.
 */
class Grid extends Component {
    /**
     * Constructor.
     */
    constructor() {
        super();
        this.size = window.getSize();

        this.state = {
            count: 0,
            blockSize: 10,
        };

        setInterval(() => {
            const { count } = this.state;

            const nextStep = (count % 12) + 1;

            this.setState({
                count: nextStep,
                blockSize: nextStep * 5,
            });
        }, 500);
    }

    /**
     * Build blue block.
     */
    blueBlock(x, y) {
        const { blockSize } = this.state;
        return (
            <view
                key={`${x}-${y}`}
                style={{
                    width: blockSize,
                    height: blockSize,
                    top: y * blockSize,
                    left: x * blockSize,
                    backgroundColor: '#33691e',
                }}
            />
        );
    }

    /**
     * Build red block.
     */
    redBlock(x, y) {
        const { blockSize } = this.state;
        return (
            <view
                key={`${x}-${y}`}
                style={{
                    width: blockSize,
                    height: blockSize,
                    top: y * blockSize,
                    left: x * blockSize,
                    backgroundColor: '#689f38',
                }}
            />
        );
    }

    /**
     * Build line.
     */
    buildLine(y) {
        const { count } = this.state;
        const line = new Array(Math.ceil(this.size.width / 50)).fill(0);

        return line.map((block, x) => {
            if ((count + y) % 2 === 0) {
                return x % 2 === 0 ? this.blueBlock(x, y) : this.redBlock(x, y);
            }
            return x % 2 === 0 ? this.redBlock(x, y) : this.blueBlock(x, y);
        });
    }

    /**
     * Render.
     */
    render() {
        const row = new Array(Math.ceil(this.size.height / 50)).fill(0);
        return (
            <view
                style={{
                    top: 0,
                    left: 0,
                }}
            >
                { row.reduce((acc, _, y) => [...acc, ...this.buildLine(y)], []) }
            </view>
        );
    }
}

export default Grid;
