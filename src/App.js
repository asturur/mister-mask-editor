import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MaskCanvas } from './MaskCanvas';
import { PreviewCanvas } from './PreviewCanvas';
import { MaskCanvasContext, PreviewCanvasContext } from './fabricContext';
import Controls from './Controls';
import MaskItem from './maskItem';
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

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [maskCanvas, setMaskcanvas] = useState(null);
  const [previewCanvas, setPreviewCanvas] = useState(null);
  return (
    <PreviewCanvasContext.Provider value={previewCanvas} >
      <MaskCanvasContext.Provider value={maskCanvas} >
        <div className={classes.root}>
          <CssBaseline />
          <Controls />
          <main
            className={classes.content}
          >
            <MaskCanvas setFabricCanvas={setMaskcanvas} />
            <PreviewCanvas setFabricCanvas={setPreviewCanvas} />
          </main>
        </div>
      </MaskCanvasContext.Provider>
    </PreviewCanvasContext.Provider>
  );
}
