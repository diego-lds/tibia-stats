import React, { useState } from 'react';
import { Input } from '@material-ui/core';
import Axios from 'axios';
function Players() {

  const [player, setPlayer] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const fetchPlayer = async (name) => {
    const url = `https://api.tibiadata.com/v2/characters/${name}.json`
    try{
      setIsLoading(true)
      const response = await Axios(url);
      setPlayer(response.data)
    } catch(e){
      console.log(e)
    }finally{
      setIsLoading(false)
    }
  }

  const handleOnKeyPress = e => {
    const name = e.target.value;
    if(e.key === "Enter"){
      fetchPlayer(name)
    }
  }
  
  console.log(player)
  return (
      <div>
          <Input 
            placeholder="Insira o nome do jogador"
            onKeyPress={handleOnKeyPress}
          />
      </div>
    );
}

export default Players;
