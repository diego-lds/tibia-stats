import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/Menuitem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from "../useStyles";
import { useEffect } from 'react';

function SelectComponent(props){
  const {
    id,
    label,
    name,
    options = [],
    onChange,
    selectedOption, 
  } = props;


  const classes = useStyles();
  

  

  const renderOptions = () => {
  return options.map((op, index) => <MenuItem key={index} value={op}>{op}</MenuItem>);
  }

  const teste = e => console.log(e.target.value)

  return (
    <div className={classes.margin}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`label-${id}`}>{label}</InputLabel>
        <Select
          onChange={onChange}
          labelId={`label-${id}`} 
          name={name}    
          id={id}
          value={selectedOption}
          label={label}
        >
          {renderOptions()}
        </Select>
      </FormControl>
  </div>  
  )
}

SelectComponent.defaultProps = {
  id: "",
  label: "",
  option: [],
}

export default SelectComponent;