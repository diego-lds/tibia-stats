import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function InputField(props) {
  const { id, label } = props;

  const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 120
    },
    selectEmpty: {
    },
    margin: {
      margin: 5,
    }
  }));

  const classes = useStyles();


  return (
    <TextField
      className={classes.margin}
      id={id}
      label={label}
      variant="outlined"
      type="number"
    />
  );
}