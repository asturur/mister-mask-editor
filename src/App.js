import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MaskCanvas } from './MaskCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { MaskCanvasContext, PreviewCanvasContext } from './fabricContext';
import { updateMaskFilter } from './updateMaskFilter';
import Controls from './Controls';
import './maskItem';
import './maskFilter';
import { fabric } from 'fabric';

// import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '16px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100%',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

export default function App() {
  const classes = useStyles();
  const [maskCanvas, setMaskcanvas] = useState(null);
  const [previewCanvas, setPreviewCanvas] = useState(null);
  useEffect(() => {
    if (maskCanvas && previewCanvas) {
      updateMaskFilter(previewCanvas, maskCanvas);
    }
  }, [maskCanvas, previewCanvas]);
  useEffect(() => {
    if (!fabric.filterBackend) {
      fabric.filterBackend = fabric.initFilterBackend();
    }
  }, []);
  return (
    <PreviewCanvasContext.Provider value={previewCanvas} >
      <MaskCanvasContext.Provider value={maskCanvas} >
        <div className={classes.root}>
          <CssBaseline />
          <Controls
            maskCanvasComp={<MaskCanvas setFabricCanvas={setMaskcanvas} />}
          />
          <main
            className={classes.content}
          >
            <PreviewCanvas setFabricCanvas={setPreviewCanvas} />
          </main>
        </div>
      </MaskCanvasContext.Provider>
    </PreviewCanvasContext.Provider>
  );
}
