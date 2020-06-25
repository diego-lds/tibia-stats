import React, {useState, useEffect} from 'react';
import AutoComplete from '../components/AutoComplete';
import axios from 'axios';

import Chart from '../components/Chart';

import formatterCreatureName from '../utils/formatterCreatureName';

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

  const renderContainer = () => {
    const loot = creatureLoot.loot2;
    if(loot){
      return (
        <div style={{width:'75%'}}>
          <Chart data={loot}/>
        </div>
      )
    }else{
      return null;
    }    
  }
  
  return (
      <div className="loot-stats">
          {listCreatures.length > 0 
          ? (
            <div style={{width:'25%'}}>
              <AutoComplete 
                data={listCreatures}
                onSelect={handleSelect} />
            </div>
          )
          : <span>Carregando...</span>}
      
          {renderContainer()}
      </div>
    );
}

export default LootStats;
