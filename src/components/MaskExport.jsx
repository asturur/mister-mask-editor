import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useCallback } from 'react';
import { useMaskContext } from '../fabricContext';
import { useTranslations } from '../hooks/useTranslations';

export const MaskExport = ({ data }) => {
  const maskCanvas = useMaskContext();
  const rows = (maskCanvas?.maskHeight ?? 0) + 4;
  const cols = (maskCanvas?.maskWidth ?? 0) * 3 + (maskCanvas?.maskWidth ?? 0) - 1;
  const { t } = useTranslations();
  const download = useCallback(() => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', "mask_v2.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [data]);
  return <>
    <TextField
      value={data}
      multiline
      size="small"
      variant="outlined"
      inputProps={{
        readOnly: true,
        cols,
        rows,
      }}
      rows={rows}
      cols={cols}
    />
    <Button variant="contained" onClick={download} >{t('Download as a file')}</Button>
  </>
}

export default MaskExport;
