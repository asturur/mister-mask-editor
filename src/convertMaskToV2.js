const genericParser = (data, itemProcessor) => {
  const lines = data.split('\n');
  console.log(lines)
  let maskWidth;
  let maskHeight;
  let i = 0;
  for (; i < lines.length; i++) {
    // search for width/height.
    const lineArray = lines[i].split(',');
    if (lineArray.length === 2 && !lines[i].includes('#')) {
      maskWidth = parseInt(lineArray[0], 10);
      maskHeight = parseInt(lineArray[1], 10);
      i++;
      break;
    }
  }
  const parsedLines = new Array(maskHeight);
  let lineIndex = 0;
  for (; i < lines.length; i++) {
    // search for width/height.
    const lineArray = lines[i].split(',');
    if (lineArray.length === maskWidth && !lines[i].includes('#')) {
      parsedLines[lineIndex++] = lineArray.map(itemProcessor);
    }
  }
  return {
    parsedLines,
    maskWidth,
    maskHeight,
  }
}

export const convertToV2 = (maskData) => {
  maskData.parsedLines = maskData.parsedLines.map((line) => line.map((bitValue) => `${bitValue}26`));
  return maskData;
}

export const parseV1Mask = (data) => genericParser(data, (value) => parseInt(value, 10));

export const parseV2Mask = (data) => genericParser(data, (value) => value);
