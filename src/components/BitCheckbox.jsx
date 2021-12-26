import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useGenericSetter from '../hooks/useGenericSetter';
import { makeStyles } from '@material-ui/core/styles';
import { useActiveObjectsContext } from '../fabricContext';
import { useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
  checkbox: {
    color: 'inherit',
    '&.Mui-checked': {
      color: 'inherit',
    }
  },
}));

// bitvalue can be only 4,2,1
export const BitCheckobx = ({ bit, color }) => {
  const { checkbox } = useStyles();
  const activeObjects = useActiveObjectsContext();
  const activeObject = activeObjects[0];
  const genericSetter = useGenericSetter();
  const checked = !!(activeObject?.bitValue & bit);
  const bitSetter = useCallback(
    () => genericSetter({ bitValue: activeObject.bitValue ^ bit }),
    [bit, activeObject, genericSetter]
  )
  return (
    <FormControlLabel labelPlacement="start" style={{ color }} control={<Checkbox disabled={!activeObject} className={checkbox} checked={checked} onChange={bitSetter} />} label={color} />
  )
}

export default BitCheckobx;
