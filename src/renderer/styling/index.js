import { omit, isUndefined } from 'lodash';
import ReactApeComponent from '../fiber/ReactApeFiberComponent';
import * as Constants from '../constants';
import { state, actions, dispatch } from '../context';

/**
 * Create text node.
 */
const createTextNode = (textValue : Number | String) => ReactApeComponent.createElement('text', { text: textValue }, { children: undefined });

/**
 * Get all numbererd styles/.
 */
const getAllNumberedStyles = (style: Constants.Instance) => {
    if (style) {
        const keys = Object.keys(style);
        return omit(style, keys.filter(key => typeof style[key] !== 'number'));
    }
    return {};
};

/**
 * Update greater.
 */
const updateGreater = (source: Object, target: Object) => {
    const keys = Object.keys(source);
    const newStyle = { ...target };
    keys.forEach((key) => {
        if (!newStyle[key] || newStyle[key] < source[key]) {
            newStyle[key] = source[key];
        }
    });
    return newStyle;
};

/**
 * Look backwards.
 */
const lookBackwards = (
    parent: Constants.Instance,
) => (parent ? getAllNumberedStyles(parent.style || {}) : {});


/**
 * Measure text width.
 */
const measureText = (
    context: CanvasRenderingContext2D,
    parent: Constants.Instance,
    { style, text },
) => {
    const { style: defaultStyle } = state();

    style = {
        ...defaultStyle,
        ...lookBackwards(parent),
        ...style,
    };
    context.font = `${style.textSize}px Arial`;
    return context.measureText(text).width;
};

/**
 * Look forward for style.
 */
const lookForward = (
    context : CanvasRenderingContext2D,
    parent: Constants.Instance,
    children: Array<Constants.Instance>,
) => {
    const textTypes = ['number', 'string'];
    let style = {};

    if (!isUndefined(children)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const child of children) {
            style = updateGreater(getAllNumberedStyles(child.style), style);
            if (textTypes.includes(typeof child) && !style.width) {
                style.width = measureText(context, parent, createTextNode(child));
            } else if (child.children) {
                style = updateGreater(lookForward(context, parent, child.children), style);
            }
        }
    }


    return style;
};

/**
 * Convert vh to pixel.
 */
const vh = (v) => {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
};

/**
 * Convert vw to pixel.
 */
const vw = (v) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
};

/**
 * Configure canvas.
 */
const configureCanvas = (element: HTMLElement) => {
    const width = vw(100);
    const height = vh(100) - 3;

    element.width = width;
    element.height = height;

    dispatch(actions.canvas.setCanvasSize({
        width,
        height,
    }));
};

export {
    lookForward,
    lookBackwards,
    updateGreater,
    configureCanvas,
};
