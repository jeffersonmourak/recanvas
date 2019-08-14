
import * as Constants from '../constants';
import { state } from '../context';
import { lookForward, lookBackwards } from '../styling';

export default (
    context : CanvasRenderingContext2D,
    parent: Constants.Instance,
    instance: Constants.Instance,
) => {
    let { style } = state();

    style = {
        ...style,
        ...lookForward(context, parent, instance.children),
        ...lookBackwards(parent),
        ...instance.style,
    };

    instance.style = style;

    context.save();
    context.beginPath();
    context.fillStyle = style.backgroundColor;
    context.fillRect(
        style.left,
        style.top,
        style.width,
        style.height,
    );
    context.restore();
};
