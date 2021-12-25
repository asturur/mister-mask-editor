import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MaskCanvas } from './MaskCanvas';
import { MaskCanvasContext } from './fabricContext';
import Controls from './Controls';
import MaskItem from './maskItem';
// https://www.npmjs.com/package/qr-code-styling
// npmjs.com/package/qr-creator

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    margin: '16px',
    display: 'flex',
    flexDirection: 'column',
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
  return (
    <MaskCanvasContext.Provider value={maskCanvas} >
      <div className={classes.root}>
        <CssBaseline />
        <Controls />
        <main
          className={classes.content}
        >
          <div className={classes.drawerHeader} />
          <MaskCanvas setFabricCanvas={setMaskcanvas} />
        </main>
      </div>
    </MaskCanvasContext.Provider>
  );
}
