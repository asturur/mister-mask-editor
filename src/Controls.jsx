import React, { useState, useEffect } from 'react';
import SliderChanger from './components/SliderChanger';
import { useMaskContext, usePreviewContext, useActiveObjectsContext, ActiveObjectsContext } from './fabricContext';
import { useTranslations } from './hooks/useTranslations';
// import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BitCheckbox from './components/BitCheckbox';
import SizeControls from './components/SizeControls';
import MaskExport from './components/MaskExport';
import { updateMaskFilter } from './updateMaskFilter';
import { getMaskData } from './getMaskData';

const Controls = ({ maskCanvasComp, maskExportData }) => {
  const activeObject = useActiveObjectsContext()[0];
  const { t } = useTranslations();
  return <Grid container spacing={2} >
      <Grid item xs={12} >
        <SizeControls />
      </Grid>
      <Grid item xs={1}>
        <Box display="flex" flexDirection="column">
          <BitCheckbox color="red" bit={4} />
          <BitCheckbox color="green" bit={2} />
          <BitCheckbox color="blue" bit={1} />
        </Box>
      </Grid>
      <Grid item xs={5} >
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
      <Grid item xs={6}>
      </Grid>
      <Grid item xs={4}>
        {maskCanvasComp}
      </Grid>
      <Grid item xs={4}>
        <MaskExport data={maskExportData} />
      </Grid>
    </Grid>
};

const WrappedControls = (props) => {
  const maskCanvas = useMaskContext();
  const previewCanvas = usePreviewContext();
  const [activeObjects, setActiveObjects] = useState([]);
  const [maskExportData, setMaskExportData] = useState('');
  useEffect(() => {
    const selectionHandler = () => {
      setActiveObjects([...maskCanvas.getActiveObjects()]);
    };
    const updateFilter = () => {
      updateMaskFilter(previewCanvas, maskCanvas);
    };
    const retrieveMaskData = () => {
      setMaskExportData(getMaskData(maskCanvas));
    };
    if (maskCanvas) {
      maskCanvas.on('object:propertySet', selectionHandler);
      maskCanvas.on('object:propertySet', updateFilter);
      maskCanvas.on('object:propertySet', retrieveMaskData);
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
  }, [maskCanvas, previewCanvas, setMaskExportData])
  return (
    <ActiveObjectsContext.Provider value={activeObjects}>
      <Controls {...props} maskExportData={maskExportData} >
      </Controls>
    </ActiveObjectsContext.Provider>
  );
};

export default WrappedControls;
