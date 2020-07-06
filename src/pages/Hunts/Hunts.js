import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import Select from '../../components/Select/Select';
import Button from '@material-ui/core/Button';
import InputField from '../../components/Input/Input'
import { Divider } from '@material-ui/core';
import {CircularProgressComponent as CircularProgress} from '../../components/CircularProgress/CircularProgress';
import GridComponent from '../../components/GridComponent/GridComponent'
import './Hunts.css';

const huntUrl = "https://tibiawiki.dev/api/huntingplaces?expand=true";
const vocations = ["Paladin", "Knight", "Mage"]
const cities = ["All", "Venore", "Roshamuul", "Issavi", "Farmine", "Yalahar", "Kazordoon", "Thais", "Rookgaard", "Feyrist", "Darashia", "Carlin", "Port Hope", "Edron", "Dawnport", "Gray Beach", "Liberty Bay", "Svargrond", "Rathleton", "Ankrahmun", "Ab'Dendriel", "Kilmaresh", "Darama"];
const categories = new Map([
  ["N/I", 0],
  ["Unknown", 0],
  ["Bad", 1],
  ["Average", 2],
  ["Good", 3],
  ["Very Good",4],
]);

function Hunts() {

  const [hunts, setHunts] = useState([]);
  const [filteredHunts, setFilteredHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [vocation, setVocation] = useState(vocations[0])
  const [level, setLevel] = useState(8)
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
    exp: item.exp || "N/I"
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

      setFilteredHunts(filteredHunts)
  };

  const handleOrderByFilter = (value) => {
    const orderedList = [...filteredHunts].sort((a, b) => categories.get(b[value]) - categories.get(a[value]))
    setFilteredHunts(orderedList)
    
  }

  return (
    <Fragment>
      <h1>Busca de Hunts</h1>
      <div className="hunts-header">
          <Select
            id="vocations"
            label="Vocations"
            name="vocations"
            options={vocations}
            onChange={e => setVocation(e.target.value)}
            selectedOption={vocation}
            />
          <InputField
            id="level"
            label="Insira seu level"
            onChange={e => setLevel(e.target.value)}
            selectedOption={level}
          />
          <Select
            id="cities"
            label="Cities"
            options={cities}
            onChange={e => setCity(e.target.value)}
            selectedOption={city}
          />
          <Button 
            style={{height:50}}
            onClick={handleSearch}
            variant="contained"
            color="primary">
              Buscar
          </Button>
      </div>
      <Divider />
      <div className="hunts-container">
        {isLoading
          ? <CircularProgress />
          : <GridComponent
              options={filteredHunts}
              orderFilter={handleOrderByFilter}
          /> 
        }
      </div>
    </Fragment>
  );
}

export default Hunts;
