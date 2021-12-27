import { fabric } from 'fabric';

const DEFAULT_MASK = [
  [4, 4, 2, 2, 1, 1],
  [4, 4, 2, 2, 1, 1],
  [2, 1, 1, 4, 4, 2],
  [2, 1, 1, 4, 4, 2],
];

export const resizeMaskCanvas = (maskCanvas, newWidth, newHeight) => {
  const currentWidth = maskCanvas.maskWidth || 0;
  const currentHeight = maskCanvas.maskHeight || 0;
  maskCanvas.maskWidth = newWidth;
  maskCanvas.maskHeight = newHeight;
  const size = fabric.MaskItem.prototype.size;
  maskCanvas.setDimensions({
    width: newWidth * size,
    height: newHeight * size,
  });
  const oldMask = maskCanvas.mask || [];
  const totalItems = newWidth * newHeight;
  // divide the oldMask in rows
  const oldLines = new Array(currentHeight);
  for (let i = 0; i < oldMask.length; i += currentWidth) {
    oldLines[i / currentWidth] = oldMask.slice(i, i + currentWidth);
  }
  maskCanvas.mask = new Array(totalItems);
  for (let h = 0; h < newHeight; h++) {
    for (let w = 0; w < newWidth; w++) {
      let item
      if (w >= currentWidth || h >= currentHeight) {
        // create new items
        item = new fabric.MaskItem({
          top: h * size,
          left: w * size,
          bitValue: DEFAULT_MASK?.[h]?.[w] ?? 4,
        });
      } else {
        // or recycle old items
        item = oldLines[h][w];
      }
      maskCanvas.mask[h * newWidth + w] = item;
    }
  }
  maskCanvas.clear();
  maskCanvas.add(...maskCanvas.mask);
  maskCanvas.fire('object:propertySet');
}
