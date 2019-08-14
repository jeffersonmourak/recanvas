import * as Constants from '../constants';

const DEFAULT_STATE = {
    root: null,
    instances: {},
};

/**
 * Components cache reducer.
 */
const reducer = (state = DEFAULT_STATE, action : Constants.Action) => {
    switch (action.type) {
    case Constants.enums.cache.setInstance: {
        state.instances[action.payload.instance.apeId] = action.payload.instance;
        return state;
    }

    case Constants.enums.cache.removeInstance: {
        delete state.instances[action.payload];
        return state;
    }

    case Constants.enums.cache.setRoot: {
        return {
            ...state,
            root: action.payload,
        };
    }

    default:
        return state;
    }
};

/**
 * Set context action.
 */
const setInstance = (payload: Object) => ({
    type: Constants.enums.cache.setInstance,
    payload,
});

/**
 * Remove context action.
 */
const removeInstance = (payload: String) => ({
    type: Constants.enums.cache.removeInstance,
    payload,
});

/**
 * Set root action.
 */
const setRoot = (payload: String) => ({
    type: Constants.enums.cache.setRoot,
    payload,
});

export {
    reducer,
    setInstance,
    removeInstance,
    setRoot,
};
