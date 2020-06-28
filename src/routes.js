
import React from 'react';

import Home from './pages/Home';
import Creatures from './pages/Creatures';
import LootStats from './pages/LootStats/LootStats';
import Players from './pages/Players'

import {Switch, Route} from 'react-router-dom';

export const myRoutes = (
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/loot-stats" component={LootStats}/>
    <Route path="/creatures" component={Creatures}/>
    <Route path="/players" component={Players}/>

</Switch>
);

