import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const testItems = [
  { icon: <PersonIcon />, text: "Profile" },
  { icon: <AccountCircleIcon />, text: "Avatar" },
  { icon: <SecurityIcon />, text: "Privacy and Security" }
];

const UserSettingsTabs = ({ changeTab }) => {
  const theme = useTheme();


  return (
    <List sx={{ width: '40%', ml: 5 }}>
      {testItems.map ((tab, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={ ()=>changeTab(tab.text) }>
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.text} sx={{color: theme.palette.texts.main}} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserSettingsTabs;