import { createStore, combineReducers } from 'redux';
import * as cache from './cache';
import * as canvas from './canvas';
import * as style from './style';
import * as Constants from '../constants';

/* eslint-disable no-underscore-dangle */
const rootContext = createStore(combineReducers({
    canvas: canvas.reducer,
    cache: cache.reducer,
    style: style.reducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

const actions = {
    canvas: {
        ...canvas,
    },
    cache: {
        ...cache,
    },
    style: {
        ...style,
    },
};

/**
 * State getter.
 */
const state = () => rootContext.getState();
/**
 * Dispatch.
 */
const dispatch = (action: Constants.Action) => rootContext.dispatch(action);

export {
    rootContext as default,
    actions,
    state,
    dispatch,
};
