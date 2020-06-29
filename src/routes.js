
import React from 'react';

import Home from './pages/Home';
import Creatures from './pages/Creatures/Creatures';
import LootStats from './pages/LootStats/LootStats';
import Players from './pages/Players/Players'
import Hunts from './pages/Hunts/Hunts'


import {Switch, Route} from 'react-router-dom';

export const myRoutes = (
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/loot-stats" component={LootStats}/>
    <Route path="/creatures" component={Creatures}/>
    <Route path="/players" component={Players}/>
    <Route path="/hunts" component={Hunts}/>



</Switch>
);

