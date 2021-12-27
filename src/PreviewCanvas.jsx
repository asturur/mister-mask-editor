import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { setPreviewScaling } from './setPreviewScaling';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    margin: '8px',
  },
}));

export const PreviewCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.StaticCanvas(canvasRef.current, {
        enableRetinaScaling: false,
        selection: false,
      });
      fabric.Image.fromURL('/sonic2genesis.gif', (img) => {
        img.objectCaching = false;
        img.strokeWidth = 0;
        img.imageSmoothing = false;
        fabricCanvas.add(img);
        setPreviewScaling(fabricCanvas, 5);
        setFabricCanvas(fabricCanvas);
      });
      window.previewCanvas = fabricCanvas;
    }
  }, [setFabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas key="previewCanvas" ref={canvasRef} ></canvas>
    </div>);
}

export default PreviewCanvas;
