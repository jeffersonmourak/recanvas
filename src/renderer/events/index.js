import * as Constants from '../constants';
import { lookForward, lookBackwards } from '../styling';
import { state } from '../context';
import { getCanvasContext, getParent } from '../utils';

type State = {
    isClicking: Boolean,
    isDragging: Boolean,
    isMoving: Boolean,
    x: Number,
    y: Number,
};

/**
 * Is mouse button event.
 */
const isMouseButton = (type: String) => ['mouseup', 'mousedown'].includes(type);

/**
 * Is Inside.
 */
const isInside = (instance: Constants.Instance, x: Number, y: Number) => {
    const parent = getParent(instance);
    const context = getCanvasContext();
    let { style } = state();

    style = {
        ...style,
        ...lookForward(context, parent, instance.children),
        ...lookBackwards(parent),
        ...instance.style,
    };

    const maxX = (style.left || 0) + (style.width || 0);
    const minX = (style.left || 0);
    const minY = (style.top || 0);
    const maxY = (style.top || 0) + (style.height || 0);

    return (x >= minX && x <= maxX) && (y >= minY && y <= maxY);
};

/**
 * Find Highlight component.
 */
const findHighlightComponent = (mouseState: State) => {
    const { instances } = state().cache;

    return Object.values(instances)
        .filter(instance => isInside(instance, mouseState.x, mouseState.y));
};

/**
 * Trigger action.
 */
const triggerAction = (instance: Constants.Instance, mouseState: State) => {
    if (mouseState.isClicking && instance.onClick) {
        instance.onClick(mouseState);
    }

    if (mouseState.isMoving && instance.onHover) {
        instance.onHover(mouseState);
    }

    if (mouseState.isDragging && instance.onDrag) {
        instance.onDrag(mouseState);
    }
};

/**
 * Mouse events.
 */
const mouseEvents = (event: Event) => {
    const {
        type, buttons: button, clientX: x, clientY: y,
    } = event;
    const mouseState = {
        isClicking: false,
        isDragging: false,
        isMoving: false,
        x,
        y,
    };

    if (!isMouseButton(type)) {
        if (button === 1) {
            mouseState.isDragging = true;
        } else {
            mouseState.isMoving = true;
        }
    } else if (type === 'mousedown') {
        mouseState.isClicking = true;
    }

    findHighlightComponent(mouseState).forEach(instance => triggerAction(instance, mouseState));
};
// eslint-disable-next-line import/prefer-default-export
export { mouseEvents };
