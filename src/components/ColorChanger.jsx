import React, { useState, useCallback, memo } from 'react';
import Popover from '@material-ui/core/Popover';
import ListItemText from '@material-ui/core/ListItemText';
import { ChromePicker } from 'react-color'
import useGenericSetter from '../hooks/useGenericSetter';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  color: {
    display: 'inline-block',
    borderRadius: '50%',
    height: 32,
    width: 32,
  },
}));


const ColorChanger = ({ color, label, property }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);
  const onClick = useCallback((e) => {
    setAnchorEl(e.currentTarget);
  }, [setAnchorEl]);
  // the plan of this is to connect react and fabricJS in a reactive way
  const genericSetter = useGenericSetter();
  const classes = useStyles();
  return (
    <>
      <ListItemText>{label}</ListItemText>
      <IconButton className={classes.button} onClick={onClick} >
        <div style={{ backgroundColor: color }} className={classes.color} />
      </IconButton>
      <Popover
        onClose={onClose}
        open={!!anchorEl}
        anchorEl={anchorEl}
      >
        <ChromePicker
          color={color}
          onChange={({ hex }) => genericSetter({ [property]: hex })}
        />
      </Popover>
    </>
  )
}

export default memo(ColorChanger);
