import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
}));

export const PreviewCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      setFabricCanvas(fabricCanvas);
      window.previewCanvas = fabricCanvas;
    }
  }, [setFabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas ref={canvasRef} ></canvas>
    </div>);
}

export default PreviewCanvas;
