import {
    getCanvasContext,
    buildTree,
    isRootInstance,
} from './utils';
import * as Constants from './constants';

import ReactApeComponent from './fiber/ReactApeFiberComponent';

import { view, text } from './elements';

/**
 * Create text node.
 */
const createTextNode = (textValue : Number | String) => ReactApeComponent.createElement('text', { text: textValue }, { children: undefined });

/**
 * Paint.
 */
const paint = (parent: Constants.Instance | null, instance : Constants.Instance) => {
    const textTypes = ['number', 'string'];

    const context = getCanvasContext();

    if (textTypes.includes(typeof instance)) {
        instance = createTextNode(instance);
    }

    switch (instance.type) {
    case 'view': {
        view(context, parent, instance);
        break;
    }
    case 'text': {
        text(context, parent, instance);
        break;
    }
    default:
        console.error(`UNKNOWN: ${instance.type}`);
    }

    if (instance.children) {
        instance.children.forEach(child => paint(instance, child));
    }
};

/**
 * Render tree.
 */
const renderTree = (instance : Constants.Instance) => {
    if (isRootInstance(instance)) {
        instance = buildTree(instance);

        paint(null, instance);
    }
};

// eslint-disable-next-line import/prefer-default-export
export { renderTree };
