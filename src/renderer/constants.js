/**
 * @flow
 */

export type Action = {
    type: String,
    payload: any,
};

export type Instance = Object;
export type Props = Object;

const enums = {
    canvas: {
        setContext: 'CANVAS_SET_CONTEXT',
        setSizes: 'CANVAS_SET_SIZE',
    },
    cache: {
        setInstance: 'CACHE_SET',
        removeInstance: 'CACHE_DEL',
        setRoot: 'CACHE_SET_ROOT',
    },
};

export {
    // eslint-disable-next-line import/prefer-default-export
    enums,
};
