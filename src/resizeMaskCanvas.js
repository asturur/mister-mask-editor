import { fabric } from 'fabric';

export const resizeMaskCanvas = (fabricCanvas) => {
  const width = fabricCanvas.maskWidth;
  const height = fabricCanvas.maskHeight;
  const size = fabric.MaskItem.prototype.size;
  fabricCanvas.setDimensions({
    width: width * size,
    height: height * size,
  });
  const totalItems = width * height;
  fabricCanvas.mask = new Array(totalItems)
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      const item = new fabric.MaskItem({
        top: h * size,
        left: w * size,
      });
      fabricCanvas.mask[h * width + w] = item;
    }
  }
  fabricCanvas.add(...fabricCanvas.mask);
}
