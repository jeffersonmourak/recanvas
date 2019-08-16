/**
 * @flow
 */

import { isArray } from 'lodash';
import { generateUID, getCacheInstance, buildTree } from '../utils';
import { actions, dispatch } from '../context';
import * as Constants from '../constants';

const ReactApeComponent = {
    /**
     * Create react ape component.
     */
    createElement(
        type: String,
        props: Object,
        rootContainerElement: Constants.Instance,
        // hostContext: Object | null,
    ) {
        return Object.assign({
            root: rootContainerElement, type, apeId: generateUID(), props,
        }, props);
    },

    /**
     *  Set initial properties.
     */
    setInitialProperties(
        element: Constants.Instance,
        type: String,
        rawProps: Object,
        // rootContainerElement: Constants.Instance,
    ) {
        Object.assign(element, rawProps);
    },

    /**
     *  Diff properties.
     */
    diffProperties(
        element: Constants.Instance,
        type: string,
        lastRawProps: Object,
        nextRawProps: Object,
        // rootContainerElement: Constants.Instance,
    ): void {
        return nextRawProps;
    },
    /**
     * Update propeties.
     */
    updateProperties(
        instance: Constants.Instance,
        updatePayload: Array<mixed>,
        type: string,
        oldProps: Constants.Instance,
        newProps: Constants.Instance,
    ) {
        const props = buildTree(instance);
        const cache = getCacheInstance(props);
        const parsedProps = { ...newProps };

        if (!isArray(newProps.children)) {
            parsedProps.children = [parsedProps.children];
        }

        if (cache !== false) {
            dispatch(actions.cache.removeInstance(cache.apeId));
        }

        Object.assign(instance, { ...parsedProps, props: parsedProps });

        const newInstance = buildTree(instance);

        dispatch(actions.cache.setInstance({
            props: newInstance.props,
            instance: newInstance,
        }));
    },
};

export default ReactApeComponent;
