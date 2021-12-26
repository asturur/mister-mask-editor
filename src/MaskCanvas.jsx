import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { resizeMaskCanvas } from './resizeMaskCanvas';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
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
      maskCanvas.maskWidth = 8;
      maskCanvas.maskHeight = 8;
      resizeMaskCanvas(maskCanvas);
      setFabricCanvas(maskCanvas);
      window.maskCanvas = maskCanvas;
    }
  }, [setFabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas ref={canvasRef} ></canvas>
    </div>);
}
