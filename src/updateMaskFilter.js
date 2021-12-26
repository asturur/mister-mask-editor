import { maskFilter } from './maskFilter';

export const updateMaskFilter = (previewCanvas, maskCanvas) => {
  const image = previewCanvas.getObjects()[0];
  if (image) {
    const { maskWidth, maskHeight, mask } = maskCanvas;
    const maskBit = new Array(mask.length);
    const maskOnIntensity = new Array(mask.length);
    const maskOffIntensity = new Array(mask.length);
    mask.forEach((maskItem, index) => {
      maskBit[index] = maskItem.bitValue;
      maskOnIntensity[index] = maskItem.onIntensity;
      maskOffIntensity[index] = maskItem.offIntensity;
    });
    const filter = new maskFilter({
      maskWidth,
      maskHeight,
      maskBit,
      maskOnIntensity,
      maskOffIntensity,
    });
    image.filters = [filter];
    image.applyFilters();
    previewCanvas.requestRenderAll();
  }
};
