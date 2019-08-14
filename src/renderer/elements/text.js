import { state } from '../context';
import { lookBackwards } from '../styling';

export default (context, parent, { style, text }) => {
    const { style: defaultStyle } = state();

    style = {
        ...defaultStyle,
        ...lookBackwards(parent),
        ...style,
    };

    context.save();
    context.beginPath();
    context.font = `${style.textSize}px Arial`;
    context.fillStyle = 'black';
    context.fillText(text, style.left, style.textSize + style.top);
    context.restore();
};
