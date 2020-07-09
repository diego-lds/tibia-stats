import React, { useState } from 'react';
import { Grid, Paper, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import './GridComponent.css';
import removeSpaces from '../../utils/removeSpaces';
import useStyles from "../useStyles";


export default function GridComponent(props) {
  const { options, orderFilter } = props;
  const [filter, setFilter] = useState("");
  const classes = useStyles();

  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
    orderFilter(event.target.value);

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
    const { bestloot, bestloot2, bestloot3, bestloot4, bestloot5 } = option;
    const bestLoots = [bestloot, bestloot2, bestloot3, bestloot4, bestloot5].join(', ')
    if (bestloot && bestloot2 && bestloot3 && bestloot4 && bestloot5) {
      return (
        <div>
          <span>Best Loots: </span>
          <span className="paper-loots italic">{bestLoots}</span>
        </div>)
    } else {
      return null;
    }
  }

  const renderCard = option => {
    const { name, exp, loot, city, vocation } = option

    return (
      <Grid xs={4} key={name} item>
        <Paper className={classes.paper} >
          <span className="paper-title">{name}</span>
          {exp && (
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
          <span>{`Cidade: ${city}`}</span>
          <span>{`Vocações: ${vocation}`}</span>
          {renderBestLoots(option)}
        </Paper>
      </Grid>)

  }
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        {options && options.length > 0 && (
          <Grid container>
            <Grid item>
              <RadioGroup
                name="filter"
                aria-label="filter"
                value={filter}
                onChange={handleChangeFilter}
                row
              >
                <FormControlLabel
                  key="experience"
                  value="exp"
                  color="primary"
                  control={<Radio color="primary" />}
                  label="Ordenar por XP" />

                <FormControlLabel
                  key="loot"
                  value="loot"
                  control={<Radio color="primary" />}
                  label="Ordenar por Loot" />
              </RadioGroup>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {options && options.map(renderCard)}
        </Grid>
      </Grid>
    </Grid>
  );
}