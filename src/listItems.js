
import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PieChartIcon from '@material-ui/icons/PieChart';
import AdbIcon from '@material-ui/icons/Adb';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to='/' >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/loot-stats">
      <ListItem button>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Loot Stats" />
      </ListItem>
    </Link>
    <Link to="/creatures">
      <ListItem button>
        <ListItemIcon>
          <AdbIcon />
        </ListItemIcon>
        <ListItemText primary="Creatures" />
      </ListItem>
    </Link>
    <Link to="/players">
      <ListItem button>
        <ListItemIcon>
          <AdbIcon />
        </ListItemIcon>
        <ListItemText primary="Players" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div><h1>Secondary List Items</h1></div>
);