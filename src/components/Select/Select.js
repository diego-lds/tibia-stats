import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/Menuitem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core/styles";

function SelectComponent(props){
  const {
    id,
    label,
    options = [],
  } = props;

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

  const [selectedOption, setSelectedOptions] = React.useState(options[0]);
  const classes = useStyles();
  

  const handleChange = event => { 
    setSelectedOptions(event.target.value);
  };

  const renderOptions = () => {
  return options.map(op => <MenuItem value={op}>{op}</MenuItem>);
  }

  return (
    <div className={classes.margin}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`label-${id}`}>{label}</InputLabel>
        <Select
          labelId={`label-${id}`}     
          id={id}
          value={selectedOption}
          onChange={handleChange}
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