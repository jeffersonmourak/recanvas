import { state } from '../context';


/**
 * Get Size.
 */
const getSize = () => {
    const { canvas: { size: canvasSize } } = state();

    return canvasSize;
};

export default {
    getSize,
};
