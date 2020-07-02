import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import Axios from 'axios';
import { CircularProgressComponent } from '../../components/CircularProgress/CircularProgress';
function Players() {

  const [player, setPlayer] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const fetchPlayer = async (name) => {
    const url = `https://api.tibiadata.com/v2/characters/${name}.json`
    try{
      setIsLoading(true)
      const response = await Axios(url);
      if(response){
        setPlayer(response.data.characters.data)
      }

      console.log(response.data)
    } catch(e){
      console.log(e)
    }finally{
      setIsLoading(false)
    }
  }

  const handleOnKeyPress = e => {
    const name = e.target.value;
    if(e.key === "Enter"){
      name.length > 2 && fetchPlayer(name)
    }
  }
  
  return (
      <div>
          <TextField 
            variant="outlined"
            placeholder="Nome do char"
            onKeyPress={handleOnKeyPress}
          />
            {isLoading && <CircularProgressComponent />}
          <div>
            {player && (
              <div style={{display: 'flex', flexDirection:'column'}}>
                <span>Name: {player.name && player.name}</span>
                <span>Guild: {player.guild && player.guild.name}</span>
                <span>Lvl:{player.level && player.level}</span>
                <span>Residence: {player.residence && player.residence}</span>
                <span>Status: {player.status && player.status}</span>
                <span>Vocation: {player.vocation && player.vocation}</span>
                <span>Title: {player.title && player.title}</span>

              </div>
            )}
          </div>
      </div>
    );
}

export default Players;
