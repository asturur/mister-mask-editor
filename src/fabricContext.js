import React, { useContext } from 'react';

const MaskCanvasContext = React.createContext(null);
const PreviewCanvasContext = React.createContext(null);


const ActiveObjectsContext = React.createContext(null);

const useMaskContext = () => useContext(MaskCanvasContext);
const usePreviewContext = () => useContext(PreviewCanvasContext);

const useActiveObjectsContext = () => useContext(ActiveObjectsContext);

export {
  MaskCanvasContext,
  PreviewCanvasContext,
  useMaskContext,
  usePreviewContext,
  ActiveObjectsContext,
  useActiveObjectsContext,
};
