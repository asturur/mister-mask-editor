import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fabric } from 'fabric';
import { useFabricContext } from './fabricContext';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
}));

const FabricCanvas = ({ setFabricCanvas }) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const classes = useStyles();
  const fabricCanvas = useFabricContext();

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      const testQrCode = new fabric.Qrcode({
        data: 'Here comes the qrcode',
        size: 512,
        innerLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      });
      fabricCanvas.add(testQrCode);
      setFabricCanvas(fabricCanvas);
      window.fabricCanvas = fabricCanvas;
    }
  }, [setFabricCanvas]);

  useEffect(() => {
    const actualRef = containerRef.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (fabricCanvas) {
        const { width, height } = entries[0].contentRect;
        fabricCanvas.setDimensions({ width, height });
      }
    });
    resizeObserver.observe(actualRef);
    return () => resizeObserver.unobserve(actualRef);
  }, [fabricCanvas]);

  return (
    <div ref={containerRef} className={classes.container}>
      <canvas ref={canvasRef} ></canvas>
    </div>);
}

export default FabricCanvas;
