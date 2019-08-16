import * as React from 'react';
import createReconciler from 'react-reconciler';

import * as NoPersistence from './HostConfigWithNoPersistence';
import * as NoHydration from './HostConfigWithNoHydration';
import { actions, dispatch } from '../context';
import ReactApeFiberComponent from './ReactApeFiberComponent';
import { renderTree } from '../canvasRenderer';
import { mouseEvents } from '../events';

import { getCanvasContext, buildTree } from '../utils';

import * as Constants from '../constants';

import {
    now as ReactApeFrameSchedulingNow,
    cancelDeferredCallback as ReactApeFrameSchedulingCancelDeferredCallback,
    scheduleDeferredCallback as ReactApeFrameSchedulingScheduleDeferredCallback,
    shouldYield as ReactApeFrameSchedulingShouldYield,
} from './ReactApeFrameScheduling';

const {
    createElement,
    setInitialProperties,
    diffProperties,
    updateProperties,
} = ReactApeFiberComponent;

type HostContext = any;
type TextInstance = any; // TODO

/**
 * Precache fiber node.
 */
const precacheFiberNode = (internalInstanceHandle, instance) => {
    const props = buildTree(instance);

    dispatch(actions.cache.setInstance({
        props,
        instance,
    }));
};

const ApeReconciler = createReconciler({
    ...NoPersistence,
    ...NoHydration,

    /**
     * Append initial child.
     */
    appendInitialChild(
        parentInstance: Constants.Instance,
        child: Constants.Instance | TextInstance,
    ) {
        if (parentInstance !== child) {
            // parentInstance.appendChild(child);
        }
    },

    /**
     * Create instance.
     */
    createInstance(
        type: string,
        props: Constants.Instance,
        rootContainerInstance: Constants.Instance,
        hostContext: string | null,
        internalInstanceHandle: Object,
    ): Constants.Instance {
        const instance: Constants.Instance = createElement(
            type,
            props,
            rootContainerInstance,
            hostContext,
        );

        precacheFiberNode(internalInstanceHandle, instance);
        return instance;
    },

    /**
     * Create text instance.
     */
    createTextInstance(
        text: string,
    ): TextInstance {
        return text;
    },

    /**
     * Finialize initial children.
     */
    finalizeInitialChildren(
        parentInstance: Constants.Instance,
        type: string,
        props: Constants.Instance,
        rootContainerInstance: Constants.Instance,
        hostContext: HostContext,
    ) {
        setInitialProperties(parentInstance, type, props, hostContext);
    },

    /**
     * Get root host context.
     */
    getRootHostContext(rootContainerInstance: Constants.Instance): Constants.Instance {
        return rootContainerInstance;
    },

    /**
     * Get child host context.
     */
    getChildHostContext(
        parentHostContext: HostContext,
    ): HostContext {
        return parentHostContext;
    },

    /**
     * Get public instance.
     */
    getPublicInstance(instance: Constants.Instance): * {
        return instance;
    },

    /**
     * Prepare for commit.
     */
    prepareForCommit(): void {
        // console.log('Prepare for commit');
        // Noop
    },

    /**
     * Prepate update.
     */
    prepareUpdate(
        instance: Constants.Instance,
        type: string,
        oldProps: Constants.Instance,
        newProps: Constants.Instance,
        rootContainerInstance: Constants.Instance,
    ): null | Object {
        return diffProperties(
            instance,
            type,
            oldProps,
            newProps,
            rootContainerInstance,
        );
    },

    /**
     * Reset after commit.
     */
    resetAfterCommit(): void {
        // Noop
    },

    now: ReactApeFrameSchedulingNow,
    isPrimaryRenderer: true,
    scheduleDeferredCallback: ReactApeFrameSchedulingScheduleDeferredCallback,
    cancelDeferredCallback: ReactApeFrameSchedulingCancelDeferredCallback,
    shouldYield: ReactApeFrameSchedulingShouldYield,
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    schedulePassiveEffects: ReactApeFrameSchedulingScheduleDeferredCallback,
    cancelPassiveEffects: ReactApeFrameSchedulingCancelDeferredCallback,

    /**
     * Should deprioritize subtree.
     */
    shouldDeprioritizeSubtree(): boolean {
        return false;
    },

    /**
     * Should set text content.
     */
    shouldSetTextContent(): boolean {
        return false;
    },
    supportsMutation: true,

    /**
     * Append child.
     */
    appendChild(
        parentInstance: Constants.Instance,
        child: Constants.Instance | TextInstance,
    ) {
        if (parentInstance !== child) {
            // parentInstance.appendChild(child);
        }
    },

    /**
     * Append child to container.
     */
    appendChildToContainer(
        parentInstance: HTMLElement,
        child: Constants.Instance,
    ): void {
        console.log('APPEND TO CONT ->>>> ', child);
        getCanvasContext().clearRect(0, 0, 200, 200);

        dispatch(actions.cache.setRoot(child.apeId));

        renderTree(child);
        // parentInstance.appendChild(child);
    },

    /**
     * Commit Text Update.
     */
    commitTextUpdate() {
        // Noop
    },

    /**
     * Commit mount.
     */
    commitMount(
        instance: Constants.Instance,
        type: string,
        newProps: Constants.Instance,

    ): void {
        console.log('commitMoutnt', type, newProps);
        // Noop / TODO
    },

    /**
     * Commit update.
     */
    commitUpdate(
        instance: Constants.Instance,
        updatePayload: Object,
        type: string,
        oldProps: Constants.Instance,
        newProps: Constants.Instance,
        internalInstanceHandle: Object,
    ): void {
        getCanvasContext().clearRect(0, 0, 1000, 1000);
        renderTree(instance);
        updateProperties(
            instance,
            updatePayload,
            type,
            oldProps,
            newProps,
            internalInstanceHandle,
        );
    },

    /**
     * Insert Before.
     */
    insertBefore() {
        console.warn('TODO: insertBefore');
        // parentInstance.insertBefore(child, beforeChild);
    },

    /**
     * Insert in container before.
     */
    insertInContainerBefore(
        // parentInstance: Constants.Instance,
        // child: Constants.Instance | TextInstance,
        // beforeChild: Constants.Instance | TextInstance,
    ) {
        console.warn('TODO: insertInContainerBefore');
        // parentInstance.insertBefore(child, beforeChild);
    },

    /**
     * Remove child.
     */
    removeChild(
    // parentInstance: Constants.Instance,
    // child: Constants.Instance | TextInstance,
    ): void {
        console.warn('TODO: removeChild');
        // parentInstance.removeChild(child);
    },

    /**
     * Remove child from container.
     */
    removeChildFromContainer(
    // parentInstance: Constants.Instance,
    // child: Constants.Instance | TextInstance,
    ): void {
        console.warn('TODO: removeChildFromContainer');
        // parentInstance.removeChild(child);
    },

    /**
     * Reset text content.
     */
    resetTextContent(): void {
        // NOOP
    },

    /**
     * Hide instance.
     */
    hideInstance(): void {
        console.warn('TODO: hideInstance');
    },

    /**
     * Hide text instance.
     */
    hideTextInstance(): void {
        console.warn('TODO: hideTextInstance');
    },

    /**
     * Unhide instance.
     */
    unhideInstance(): void {
        console.warn('TODO: unhideInstance');
    },

    /**
     * Unhide text instance.
     */
    unhideTextInstance(): void {
        console.warn('TODO: unhideTextInstance');
    },
});

let internalContainerStructure;

/**
 * Render subtree into container.
 */
function renderSubtreeIntoContainer(
    parentComponent: ?React.Component<any, any>,
    element: HTMLElement,
    maybeContainer: ?string,
    callback: ?Function,
) {
    // We must do this only once
    if (!internalContainerStructure) {
        internalContainerStructure = ApeReconciler.createContainer(
            element,
            false,
            false,
        );
        dispatch(actions.canvas.setContext(element.getContext('2d')));
    }

    ApeReconciler.updateContainer(parentComponent, internalContainerStructure, null, callback);
}


const ReactApe = {
    /**
     * Render.
     */
    render(element: React.Element<any>, container: HTMLElement, callback: ?Function) {
        document.body.addEventListener('mousemove', mouseEvents);
        document.body.addEventListener('mousedown', mouseEvents);
        document.body.addEventListener('mouseup', mouseEvents);

        return renderSubtreeIntoContainer(element, container, callback);
    },

    /**
     * Unmount component at node.
     */
    unmountComponentAtNode() {
        document.body.removeEventListener('mousemove', mouseEvents);
        document.body.removeEventListener('mousedown', mouseEvents);
        document.body.removeEventListener('mouseup', mouseEvents);
    },
};

export default ReactApe;
