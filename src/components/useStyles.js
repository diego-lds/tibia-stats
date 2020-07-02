
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
      minWidth: 120
    },
    selectEmpty: {
    },
    margin: {
      margin: 10,
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      minHeight: 120,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  export default useStyles;