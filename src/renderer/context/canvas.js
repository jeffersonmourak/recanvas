import * as Constants from '../constants';

/**
 * Canvas Reducer.
 */
const reducer = (state = { }, action : Constants.Action) => {
    switch (action.type) {
    case Constants.enums.canvas.setContext:
        return {
            ...state,
            context: action.payload,
        };
    case Constants.enums.canvas.setSizes:
        return {
            ...state,
            size: action.payload,
        };
    default:
        return state;
    }
};

/**
 * Set context action.
 */
const setContext = (payload: Object) => ({
    type: Constants.enums.canvas.setContext,
    payload,
});

/**
 * Set context action.
 */
const setCanvasSize = (payload: Object) => ({
    type: Constants.enums.canvas.setSizes,
    payload,
});


export {
    reducer,
    setContext,
    setCanvasSize,
};
