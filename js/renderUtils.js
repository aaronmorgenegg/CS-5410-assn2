function clearCanvas(canvas, context) {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
}

function drawRectangle(context, spec) {
        context.save();

        context.fillStyle = spec.fill;
        context.fillRect(spec.x, spec.y, spec.width, spec.height);

        context.strokeStyle = spec.stroke;
        context.strokeRect(spec.x, spec.y, spec.width, spec.height);

        context.restore();

}

