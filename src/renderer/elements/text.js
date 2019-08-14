export default (context, { style, text }) => {
    style = {
        ...style,
        left: 10,
        top: 10,
        width: 20,
    };
    context.save();
    context.beginPath();
    context.fillStyle = 'black';
    context.fillText(text, style.left, 15 + style.top);
    context.restore();
};
