import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import Select from '../../components/Select/Select';
import Button from '@material-ui/core/Button';
import InputField from '../../components/Input/Input'
import { Divider } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Hunts.css';

const huntUrl = "https://tibiawiki.dev/api/huntingplaces?expand=true";
const vocations = ["Paladin", "Knight", "Mage"]
const cities = ["All", "Venore", "Roshamuul", "Issavi", "Farmine", "Yalahar", "Kazordoon", "Thais", "Rookgaard", "Feyrist", "Darashia", "Carlin", "Port Hope", "Edron", "Dawnport", "Gray Beach", "Liberty Bay", "Svargrond", "Rathleton", "Ankrahmun", "Ab'Dendriel", "Kilmaresh", "Darama"];

function Hunts() {

  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [vocation, setVocation] = useState(vocations[0])
  const [level, setLevel] = useState(0)
  const [city, setCity] = useState(cities[0])

  useEffect(() => {
    const fetchHunts = async () => {
      try {
        setIsLoading(true)
        const response = await Axios.get(huntUrl);
        setHunts(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false)
      }
    }
    fetchHunts();
  }, [])

  const parseHuntData = item => {
   return{
    ...item,
    lvlknights: Number(item.lvlknights) || null,
    lvlmages: Number(item.lvlmages)|| null,
    lvlpaladins: Number(item.lvlpaladins)|| null,
  }
}

  const handleSearch = () => {
    const parsedHunts = hunts.map(parseHuntData);

    let vocationProp = `lvl${vocation.toLowerCase()}s`;

    const filteredHunts = parsedHunts
      .filter(hunt => hunt[vocationProp] != null
        && hunt[vocationProp] < level)
       .filter(hunt =>  city !== "All" ? hunt.city === city : hunt.city !== "All")
      .sort((a, b)=> b[vocationProp] - a[vocationProp])
      .slice(0, 30);

    console.log(filteredHunts)
  };

  const handleOnChangeVocation = e => setVocation(e.target.value)
  const handleOnChangeLevel = e => setLevel(Number(e.target.value))
  const handleOnChangeCity = e => setCity(e.target.value)

  return (
    <Fragment>
      <div className="hunts-header">
          <Select
            id="vocations"
            label="Vocations"
            name="vocations"
            options={vocations}
            onChange={handleOnChangeVocation}
            selectedOption={vocation}
            />
          <InputField
            onChange={handleOnChangeLevel}
            id="Level"
            label="Insira seu level"
          />
          <Select
            id="cities"
            label="Cities"
            options={cities}
            onChange={handleOnChangeCity}
            selectedOption={city}
          />
          <Button style={{height:50}} onClick={handleSearch} variant="contained" color="primary">Buscar</Button>
      </div>
      <Divider />
      <div className="hunts-container">
        {isLoading && <CircularProgress />}
      </div>
    </Fragment>
  );
}

export default Hunts;
