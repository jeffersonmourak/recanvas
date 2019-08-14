import React from 'react';
import { isUndefined, isArray } from 'lodash';
import { state } from '../context';
import * as Constants from '../constants';

/**
 * Is number helper.
 */
const isNumber = number => typeof number === 'number';
/**
 * Is string helper.
 */
const isString = string => typeof string === 'string';

/**
 * Generate UID.
 */
const generateUID = () => (Math.random().toString(36).substring(2, 15)
+ Math.random().toString(36).substring(2, 15));

/**
 * Match Objects.
 */
const matchObjects = (source: Object, target: Object) => {
    const keys = Object.keys(source);

    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
        if (isUndefined(target[key])) {
            return false;
        }
        if (typeof target[key] === 'object') {
            return matchObjects(source[key], target[key]);
        }

        if (source[key] !== target[key]) {
            return false;
        }
    }
    return true;
};

/**
 * Get cache instance.
 */
const getCacheInstance = (props: Constants.Props) => {
    const { instances } = state().cache;
    const instance = Object
        .values(instances)
        .filter(_instance => matchObjects(_instance.props, props));

    if (!instance.length === 0) {
        return false;
    }

    return instance[0];
};

/**
 * Get cache instance.
 */
const isRootInstance = (instance: Constants.Instance) => {
    const { root } = state().cache;

    return root === instance.apeId;
};

/**
 * Get cache instance.
 */
const getCanvasContext = () => {
    const { canvas } = state();

    return canvas.context;
};

/**
 * Build Tree.
 */
const buildTree = (instance: Constants.Instance) => {
    if (!isArray(instance.children)) {
        instance.children = [instance.children];
    }

    instance.children = instance.children.map((child) => {
        if (React.isValidElement(child)) {
            return buildTree(getCacheInstance(child.props));
        }

        return child;
    });

    return instance;
};

export {
    isNumber,
    isString,
    generateUID,
    getCacheInstance,
    getCanvasContext,
    buildTree,
    isRootInstance,
    matchObjects,
};
