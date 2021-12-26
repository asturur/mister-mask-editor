import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SliderChanger from './components/SliderChanger';
import { useMaskContext, usePreviewContext, useActiveObjectsContext, ActiveObjectsContext } from './fabricContext';
import { useTranslations } from './hooks/useTranslations';
// import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BitCheckbox from './components/BitCheckbox';
import { updateMaskFilter } from './updateMaskFilter';

const Controls = () => {
  const fabricCanvas = useMaskContext();
  const activeObject = useActiveObjectsContext()[0];
  const { t } = useTranslations();
  return <Grid container spacing={2} >
      <Grid item xs={12} >
        <TextField label={t('mask width')} value={fabricCanvas?.maskWidth ?? 0} variant="outlined" />
        <TextField label={t('mask height')} value={fabricCanvas?.maskHeight ?? 0} variant="outlined" />
        <Button variant="contained">
          {t('OK')}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Box display="flex" flexDirection="column">
          <BitCheckbox color="red" bit={4} />
          <BitCheckbox color="green" bit={2} />
          <BitCheckbox color="blue" bit={1} />
        </Box>
      </Grid>
      <Grid item xs={4} >
        <Box display="flex" flexDirection="column">
          <SliderChanger
            label={t('On intensity')}
            property="onIntensity"
            min={0}
            step={1}
            disabled={!activeObject || activeObject.bitValue === 0}
            max={15}
            value={activeObject?.onIntensity ?? 0}
          />
          <SliderChanger
            label={t('Off intensity')}
            property="offIntensity"
            min={0}
            step={1}
            disabled={!activeObject || activeObject.bitValue === 7}
            max={15}
            value={activeObject?.offIntensity ?? 0}
          />
        </Box>
      </Grid>
    </Grid>
};

const WrappedControls = () => {
  const maskCanvas = useMaskContext();
  const previewCanvas = usePreviewContext();
  const [activeObjects, setActiveObjects] = useState([]);
  useEffect(() => {
    const selectionHandler = () => {
      setActiveObjects([...maskCanvas.getActiveObjects()]);
    };
    const updateFilter = () => {
      updateMaskFilter(previewCanvas, maskCanvas);
    };
    if (maskCanvas) {
      maskCanvas.on('object:propertySet', selectionHandler);
      maskCanvas.on('object:propertySet', updateFilter);
      maskCanvas.on('selection:cleared', selectionHandler);
      maskCanvas.on('selection:created', selectionHandler);
      maskCanvas.on('selection:updated', selectionHandler);
    }
    return () => {
      if (maskCanvas) {
        maskCanvas.off('object:propertySet', selectionHandler);
        maskCanvas.off('object:propertySet', updateFilter);
        maskCanvas.off('selection:cleared', selectionHandler);
        maskCanvas.off('selection:created', selectionHandler);
        maskCanvas.off('selection:updated', selectionHandler);
      }
    }
  }, [maskCanvas, previewCanvas])
  return (
    <ActiveObjectsContext.Provider value={activeObjects}>
      <Controls />
    </ActiveObjectsContext.Provider>
  );
};

export default WrappedControls;
