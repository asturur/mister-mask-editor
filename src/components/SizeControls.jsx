import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMaskContext } from '../fabricContext';
import { useTranslations } from '../hooks/useTranslations';
import { useCallback, useRef, useEffect } from 'react';
import { resizeMaskCanvas } from '../resizeMaskCanvas';

export const SizeControls = () => {
  const maskCanvas = useMaskContext();
  const width = useRef();
  const height = useRef();
  const { t } = useTranslations();

  const onOkClick = useCallback(() => {
    maskCanvas.maskWidth = parseInt(width.current.value, 10);
    maskCanvas.maskHeight = parseInt(height.current.value, 10);
    console.log(width.current, height.current)
    resizeMaskCanvas(maskCanvas);
  }, [maskCanvas]);

  useEffect(() => {
    if (maskCanvas) {
      width.current.value = maskCanvas.maskWidth;
      height.current.value = maskCanvas.maskHeight;
    }
  }, [maskCanvas])

  return <>
    <TextField size="small" inputRef={width} label={t('mask width')} variant="outlined" />
    <TextField size="small" inputRef={height} label={t('mask height')} variant="outlined" />
    <Button variant="contained" onClick={onOkClick} >
      {t('OK')}
    </Button>
  </>
}

export default SizeControls
