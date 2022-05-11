import * as React from 'react';
import { MenuItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Link } from 'react-router-dom';



export default function SideBar({ to, text, Icon }) {
  return (
    <Link to={to}>
      <Box my={2.5} ml={2} >
        <MenuItem>
          <ListItemIcon>
            <Icon  />
          </ListItemIcon>
          <Box ml={1}>
            <ListItemText >{ text }</ListItemText> 
          </Box>
        </MenuItem>
      </Box>
    </Link>

  );
}
