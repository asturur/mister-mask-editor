import { fabric } from 'fabric';

export const resizeMaskCanvas = (maskCanvas) => {
  const width = maskCanvas.maskWidth;
  const height = maskCanvas.maskHeight;
  const size = fabric.MaskItem.prototype.size;
  maskCanvas.setDimensions({
    width: width * size,
    height: height * size,
  });
  const totalItems = width * height;
  maskCanvas.mask = new Array(totalItems)
  for (let h = 0; h < height; h++) {
    for (let w = 0; w < width; w++) {
      const item = new fabric.MaskItem({
        top: h * size,
        left: w * size,
      });
      maskCanvas.mask[h * width + w] = item;
    }
  }
  maskCanvas.clear();
  maskCanvas.add(...maskCanvas.mask);
  maskCanvas.fire('object:propertySet');
}
