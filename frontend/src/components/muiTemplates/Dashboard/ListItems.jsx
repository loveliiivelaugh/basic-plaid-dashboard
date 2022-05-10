import * as React from 'react';
import  {ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

const icons  = [
  <DashboardIcon />,
  <ShoppingCartIcon />,
  <PeopleIcon />,
  <BarChartIcon />,
  <LayersIcon />,
  <AssignmentIcon />
];

export const ListItems = ({ items })  => items.map(({ title, handleClick }, index) => index === 0 ? (
  <ListSubheader key={title} component="div" inset>
    {title}
  </ListSubheader>
) : (
  <ListItemButton key={index} onClick={() => handleClick(title)}>
    <ListItemIcon>{icons[index - 1]}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
));