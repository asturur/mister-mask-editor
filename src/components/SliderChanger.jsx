import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import useGenericSetter from '../hooks/useGenericSetter';
import Slider from '@material-ui/core/Slider';

const useStyle = makeStyles({
  formControl: {
    width: '100%',
  }
});

export const SliderChanger = ({ disabled, property, value, label, min, max, step }) => {
  const genericSetter = useGenericSetter();
  const classes = useStyle();
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`slider-${property}`}>{label}</InputLabel>
        <Slider
          labelId={`slider-${property}`}
          value={value}
          onChange={(e) => console.log(e) || genericSetter({ [property]: e.target.value })}
          label={label}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </FormControl>
    </>
  )
}

export default memo(SliderChanger);
