import React, { defaultProps } from 'react';
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
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
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
    <div >
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

defaultProps = {
  id: "",
  label: "",
  option: [],
}

export default SelectComponent;