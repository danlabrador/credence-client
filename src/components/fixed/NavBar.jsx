import React, { useState } from 'react';
import { Paper, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const testItems = [
  { icon: <PeopleAltIcon />, text: "Users Management" },
  { icon: <HomeIcon />, text: "Test" },
];

const NavBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Paper sx={{
      width: open ? 350 : 60,
      height: '100vh',
      position: 'fixed',
      left: 0, top: 0,
      borderRadius: 0,
      mt: 8,
      backgroundColor: theme.palette.teal.main,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      transition: 'width 0.3s',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: open ? 'flex-end' : 'center',
        width: '95%',
        mt: 2
      }}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Box sx={{ width: '100%', borderBottom: `1px solid ${theme.palette.divider}`, mb: 1 }} />
      {open && (
        <List sx={{ width: '100%' }}>
          {testItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default NavBar;
