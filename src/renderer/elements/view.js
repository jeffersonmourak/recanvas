export default (context, { style }) => {
    style = {
        ...style,
        left: 10,
        top: 10,
        width: 20,
    };
    context.save();
    context.beginPath();
    context.fillStyle = style.backgroundColor;
    context.fillRect(style.left, style.top, style.width, 10);
    context.restore();
};
