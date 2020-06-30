import React from 'react';
import TextField from '@material-ui/core/TextField';

import useStyles from "../useStyles";

export default function InputField(props) {
  const { id, label, onChange } = props;


  const classes = useStyles();


  return (
    <TextField
      onChange={onChange}
      className={classes.margin}
      id={id}
      label={label}
      variant="outlined"
      type="number"
    />
  );
}