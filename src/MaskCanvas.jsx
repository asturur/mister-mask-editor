import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { resizeMaskCanvas } from './resizeMaskCanvas';

const useStyles = makeStyles(() => ({
  container: {
    display: 'inline-flex',
    margin: '8px',
  },
}));

export const MaskCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();
  useEffect(() => {
    if (canvasRef.current) {
      const maskCanvas = new fabric.Canvas(canvasRef.current, {
        enableRetinaScaling: false,
        skipOffscreen: false,
      });
      resizeMaskCanvas(maskCanvas, 6, 4);
      setFabricCanvas(maskCanvas);
      maskCanvas.fire('object:propertySet');
      window.maskCanvas = maskCanvas;
    }
  }, [setFabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas key="maskCanvas" ref={canvasRef} ></canvas>
    </div>);
}
