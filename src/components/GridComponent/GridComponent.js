import React, { useState } from 'react';
import { Grid, Paper, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import './GridComponent.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column"


  },
  control: {
    padding: theme.spacing(2),
  },
}));


export default function GridComponent(props) {
  const { options } = props;

  const [filter, setFilter] = useState("experience");
  const classes = useStyles();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const renderRecommendedLevel = option => {
    const { lvlknights, lvlmages, lvlpaladins } = option;
    return (
      <div className="hunt-card">
        {lvlknights && <span>{`Knight: ${lvlknights}`}</span>}
        {lvlmages && <span>{`Mage: ${lvlmages}`}</span>}
        {lvlpaladins && <span>{`Paladin: ${lvlpaladins}`}</span>}
      </div>
    )
  }

  const renderBestLoots = option => {
    const {bestLoot, bestLoot2, bestLoot3, bestLoot4, bestLoot5} = option;
    return(null
    // <span>{`Best Loots: ${}`}</span>
    )
  }

  const renderCard = option => {
    return (
      <Grid xs={4} key={option.name} item>
        <Paper className={classes.paper} >
            {option.name}
            <span>{`Exp: ${option.exp} Loot: ${option.loot}`}</span>
            {renderRecommendedLevel(option)}{/* 
            <span>{`Cidade: ${option.city}`}</span>
            <span>{`Vocações: ${option.vocations}`}</span> */}

        </Paper>
      </Grid>)
  }
  console.log(options)
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        {options.length > 0 && (
          <Grid container>
            <Grid item>
              <RadioGroup
                name="filter"
                aria-label="filter"
                value="filter"
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  key="experience"
                  value="experience"
                  control={<Radio />}
                  label="Ordenar por XP"
                />

                <FormControlLabel
                  key="loot"
                  value="loot"
                  control={<Radio />}
                  label="Ordenar por Loot"

                />
              </RadioGroup>
            </Grid>
          </Grid>

        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {options.map(renderCard)}
          {/* {[0, 1, 2, 3, 4, 5 , 6, 7, 8].map((value) => (
            <Grid xs={4} key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))} */}
        </Grid>
      </Grid>
    </Grid>
  );
}