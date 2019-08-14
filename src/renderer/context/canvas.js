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

export { reducer, setContext };
