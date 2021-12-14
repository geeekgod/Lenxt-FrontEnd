export const drawRect = (detection, ctx) => {
  detection.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    const color = "white";
    ctx.strokeStyle = color;
    ctx.font = "38px Arial";
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.fillText(text, x, y - 15);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
