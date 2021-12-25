import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { resizeMaskCanvas } from './resizeMaskCanvas';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const MaskCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        enableRetinaScaling: false,
        skipOffscreen: false,
      });
      fabricCanvas.maskWidth = 8;
      fabricCanvas.maskHeight = 8;
      resizeMaskCanvas(fabricCanvas);
      setFabricCanvas(fabricCanvas);
      window.fabricCanvas = fabricCanvas;
    }
  }, []);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas ref={canvasRef} ></canvas>
    </div>);
}
