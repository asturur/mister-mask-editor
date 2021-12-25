import React, { useCallback, useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import useGenericSetter from './hooks/useGenericSetter';
import SliderChanger from './components/SliderChanger';
import { useMaskContext, useActiveObjectsContext, ActiveObjectsContext } from './fabricContext';
import { fabric } from 'fabric';
import { useTranslations } from './hooks/useTranslations';


const Controls = () => {
  const fabricCanvas = useMaskContext();
  const activeObject = useActiveObjectsContext()[0];
  const { t } = useTranslations();

  return <>
    <List>
    <ListItem>
      <TextField label={t('mask width')} value={fabricCanvas?.maskWidth} variant="outlined" />
      <TextField label={t('mask height')} value={fabricCanvas?.maskHeight} variant="outlined" />
      <Button variant="contained">
        {t('OK')}
      </Button>
    </ListItem>
        <ListItem>
          <SliderChanger
            label={t('On intensity')}
            property="onIntensity"
            min={0}
            step={1}
            disabled={!activeObject}
            max={15}
            value={activeObject?.onIntensity ?? 0}
          />
        </ListItem>
        <ListItem>
          <SliderChanger
            label={t('Off intensity')}
            property="offIntensity"
            min={0}
            step={1}
            disabled={!activeObject}
            max={15}
            value={activeObject?.offIntensity ?? 0}
          />
        </ListItem>
    </List>
  </>
};

const WrappedControls = () => {
  const fabricCanvas = useMaskContext();
  const [activeObjects, setActiveObjects] = useState([]);
  useEffect(() => {
    const selectionHandler = () => {
      setActiveObjects([...fabricCanvas.getActiveObjects()]);
    };
    if (fabricCanvas) {
      fabricCanvas.on('object:propertySet', selectionHandler);
      fabricCanvas.on('selection:cleared', selectionHandler);
      fabricCanvas.on('selection:created', selectionHandler);
      fabricCanvas.on('selection:updated', selectionHandler);
    }
    return () => {
      if (fabricCanvas) {
        fabricCanvas.off('object:propertySet', selectionHandler);
        fabricCanvas.off('selection:cleared', selectionHandler);
        fabricCanvas.off('selection:created', selectionHandler);
        fabricCanvas.off('selection:updated', selectionHandler);
      }
    }
  }, [fabricCanvas])
  return (
    <ActiveObjectsContext.Provider value={activeObjects}>
      <Controls />
    </ActiveObjectsContext.Provider>
  );
};

export default WrappedControls;
