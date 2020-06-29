import React, { useState, useEffect } from 'react';
import './Hunts.css';
import Axios from 'axios';

const huntUrl = "https://tibiawiki.dev/api/huntingplaces?expand=true";

function Hunts() {

  
  const [hunts, setHunts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

      useEffect(() => {
        const fetchHunts = async () => {
          try{
            setIsLoading(true)
            const response = await Axios.get(huntUrl);
            setHunts(response.data);
          }catch(e){
            console.log(e);
          }finally{
            setIsLoading(false)
          }
        }
        fetchHunts();
      },[])

      console.log(hunts)

  return (
      <div className="hunts-container">
          
      </div>
    );
}

export default Hunts;
