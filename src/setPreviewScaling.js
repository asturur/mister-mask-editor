export const setPreviewScaling = (fabricCanvas, scaling) => {
  const screenshot = fabricCanvas.getObjects()[0];
  if (!screenshot) {
    return;
  }
  if (!screenshot.originalFile) {
    screenshot.originalFile = screenshot._originalElement;
  }
  screenshot.scaleX = scaling;
  screenshot.scaleY = scaling;
  screenshot.setElement(screenshot.toCanvasElement());
  screenshot.scaleX = 1;
  screenshot.scaleY = 1;
  fabricCanvas.setDimensions({
    width: 320 * scaling,
    height: 240 * scaling,
  });
}
