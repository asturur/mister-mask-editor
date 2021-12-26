export const getMaskData = (maskCanvas) => {
  const { maskWidth, maskHeight } = maskCanvas;
  const objects = maskCanvas.getObjects();
  const lines = new Array(maskHeight);
  for (let i = 0; i < objects.length; i += maskWidth) {
    const line = objects
      .slice(i, i + maskWidth)
      .map((maskItem) =>
        `${maskItem.bitValue}${maskItem.onIntensity.toString(16)}${maskItem.offIntensity.toString(16)}`
      )
      .join(',');
    lines[i / maskWidth] = line;
  }
  return `v2

${maskWidth},${maskHeight}

${lines.join('\n')}`;
}
