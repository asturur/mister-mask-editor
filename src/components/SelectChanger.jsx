import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useGenericSetter from '../hooks/useGenericSetter';

const useStyle = makeStyles({
  formControl: {
    width: '100%',
  }
});

const SelectChanger = ({ property, value, label, options }) => {
  const genericSetter = useGenericSetter();
  const classes = useStyle();
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`select-${property}`}>{label}</InputLabel>
        <Select
          labelId={`select-${property}`}
          value={value}
          onChange={(e) => genericSetter({ [property]: e.target.value })}
          label={label}
        >
          {options.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(SelectChanger);
