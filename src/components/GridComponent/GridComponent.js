import React, { useState } from 'react';
import { Grid, Paper, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';
import './GridComponent.css';
import removeSpaces from '../../utils/removeSpaces';

const useStyles = makeStyles((theme) => ({
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
    const {bestloot, bestloot2, bestloot3, bestloot4, bestloot5} = option;
    const bestLoots = [bestloot, bestloot2, bestloot3, bestloot4, bestloot5].join(', ')
    if(bestloot && bestloot2 && bestloot3 && bestloot4 && bestloot5){
      return <div>
          <span>Best Loots: </span>
          <span className="paper-loots italic">{bestLoots}</span> 
      </div>
    }else{
      return null;
    }
  }

  const renderCard = option => {
    const {name, exp, loot, city, vocation} = option 
    
    console.log(exp && removeSpaces(exp))
    return (
      <Grid xs={4} key={option.name} item>
        <Paper className={classes.paper} >
            <span className="paper-title">{option.name}</span>
            {exp &&  (
              <div >
                <span>Experiência: </span>
                <span className={`${exp && removeSpaces(exp)}`}>{exp}</span>
              </div>
              )}
            {loot && (
              <div >
                <span>Loot: </span>
                <span className={`${loot && removeSpaces(loot)}`}>{loot}</span>
              </div>
            )}
            {renderRecommendedLevel(option)}
            <span className="paper-city">{`Cidade: ${city}`}</span>
            <span className="paper-vocations">{`Vocações: ${vocation}`}</span>
            {renderBestLoots(option)}

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