import { omit } from 'lodash';
import ReactApeComponent from '../fiber/ReactApeFiberComponent';
import * as Constants from '../constants';
import { state } from '../context';
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

    // eslint-disable-next-line no-restricted-syntax
    for (const child of children) {
        style = updateGreater(getAllNumberedStyles(child.style), style);
        if (textTypes.includes(typeof child) && !style.width) {
            style.width = measureText(context, parent, createTextNode(child));
        } else if (child.children) {
            style = updateGreater(lookForward(context, parent, child.children), style);
        }
    }

    return style;
};

export {
    lookForward,
    lookBackwards,
    updateGreater,
};
