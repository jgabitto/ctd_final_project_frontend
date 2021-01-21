import React, { PureComponent } from "react";
import { CanvasOverlay } from "react-map-gl";

const Directions = ({ points }) => {

  const redraw = ({ width, height, ctx, isDragging, project, unproject }) => {
    const color = "black",
      lineWidth = 3,
      renderWhileDragging = true;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach(point => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  return <CanvasOverlay redraw={redraw} />;
}

export default Directions;
