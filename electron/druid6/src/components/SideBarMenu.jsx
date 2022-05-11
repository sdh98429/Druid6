import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material//Box';
import Cloud from '@mui/icons-material/Cloud';
import { Link } from 'react-router-dom';

import './SideBar.scss';

export default function SideBar({ to, text }) {
  
  return (
    <Link to={to}>
      <Box my={2}>
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>{ text }</ListItemText> 
        </MenuItem>
      </Box>
    </Link>
    
  );
}
