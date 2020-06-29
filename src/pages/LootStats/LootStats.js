import React, {useState, useEffect} from 'react';
import AutoComplete from '../../components/AutoComplete';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chart from '../../components/Chart/Chart';

import './LootStats.css';

function LootStats() {

const [listCreatures, setListCreatures] = useState([]);
const [creatureLoot, setCreatureLoot] = useState([])

  useEffect(() => {
    fetchListCreatures();
  }, []);

  const fetchListCreatures = async () => {
    const response = await axios('https://tibiawiki.dev/api/creatures');
    setListCreatures(response.data)
  }
  
  const fetchCreatureLoot = async (creature) =>  { 
    const response = await axios(`https://tibiawiki.dev/api/v2/loot/${creature}`);
    setCreatureLoot(response.data);
  } 

  const handleSelect = value => {
    
    fetchCreatureLoot(value)

  }

  const renderChart = () => {
    
    if(loot){
      return <Chart className="teste" data={loot || []}></Chart>
    }else  {
      if(listCreatures.length > 0 && creatureLoot.length > 0){
          return <CircularProgress />
      } else return null
    }

   
    

  }

  const loot = creatureLoot.loot2;
  console.log(creatureLoot)
  return (
      <div>
          {listCreatures.length > 0
          ? (
            <div>
                <AutoComplete 
                  data={listCreatures}
                  onSelect={handleSelect} />
                  {renderChart()}
            </div>
          )
          : <CircularProgress />}      
      </div>
    );
}

export default LootStats;
