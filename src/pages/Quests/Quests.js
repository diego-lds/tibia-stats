import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { CircularProgressComponent as CircularProgress } from '../../components/CircularProgress/CircularProgress';
import extractStringFromDoubleSquareBrackets from '../../utils/extractStringFromDoubleSquareBrackets';
import { List, makeStyles } from '@material-ui/core';

const baseUrl = 'https://tibiawiki.dev/api/';

function Quests() {

  const useStyles = makeStyles((theme) => ({
    box: {
      padding: '20px',
      fontFamily: "Roboto, Helvetica, Arial",
    },
    title: {
      fontSize: '18px',
      marginBottom: '15px',
      fontWeight: 'bold',
    },
    description: {
      fontSize: '15px',
      fontStyle: 'italic',

      color: '#8b8589',
    },
    label: {
      fontWeight: 'bold',
    },
    header: {
      marginBottom: '20px',
    },
    paragraph: {
      margin: '0px'
    }
  }));

  const classes = useStyles();

  const [quests, setQuests] = useState([]);
  const [parsedQuests, setParsedQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await Axios.get(`${baseUrl}/quests?expand=true`);
        setQuests(response.data)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const parsedQuests = quests
      .map(parseQuests)
      .sort((a, b) => b.lvlRequired - a.lvlRequired)
    setParsedQuests(parsedQuests)

    console.log(quests.map(p => p.lvlrec && p.lvlrec.replace('+', '')))
  }, [quests])

  const parseQuests = quest => ({
    title: quest.name,
    description: quest.legend && quest.legend.replace("[[", "").replace("]]", ""),
    location: extractStringFromDoubleSquareBrackets(quest.location),
    lvlRequired: quest.lvlrec && parseInt(quest.lvlrec.replace(/\D/g, '')),
    monsters: extractStringFromDoubleSquareBrackets(quest.dangers),
    premium: quest.premium === 'yes',
    rewards: extractStringFromDoubleSquareBrackets(quest.reward)
  })

  const renderQuest = (quest, index) => {
    const { title, description, lvlRequired, monsters, location, rewards, premium } = quest
    return (
      <div key={index} className={classes.box} style={{ backgroundColor: `${index % 2 === 0 ? '#e9e9e9' : 'white'}` }} >
        <div className={classes.header}>
          <span className={classes.title}>{title}</span><br />
          {description && <div><span className={classes.description}>{`"${description}"`}</span><br /></div>}
        </div>
        <div>
          <span className={classes.label}>Monstros: </span>
          <span className={classes.paragraph}>{monsters}</span>
        </div>
        <div>
          <span className={classes.label}>Localização: </span>
          <span>{location}</span>
        </div>
        <div>
          <span className={classes.label}>Level Mínimo: </span>
          <span>{lvlRequired || 0}</span>
        </div>
        <div>
          <span className={classes.label}>Recompensas: </span>
          <span>{rewards}</span>
        </div>
        <div>
          <span className={classes.label}>Premium: </span>
          <span>{premium ? 'Sim' : 'Não'}</span>
        </div>
      </div >
    )
  }

  return (
    <div>
      {isLoading
        ? <CircularProgress></CircularProgress>
        : (
          <div>
            <h1>Lista de Quest</h1>
            {parsedQuests.length > 0 && <List>{parsedQuests.map(renderQuest)}</List>}
          </div>
        )
      }
    </div>
  );
}

export default Quests;
