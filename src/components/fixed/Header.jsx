import { useState, useContext, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import logoFull from '../../assets/logo-full.svg';

import MyContext from '../../MyContext';
import useLogin from '../../hooks/useLogin';

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, isAdmin } = useContext(MyContext);
  const [profilePicture, setProfilePicture] = useState(
    user.profilePic && user.profilePic.path ? user.profilePic.path :
      `https://ui-avatars.com/api/?background=4208de&color=fff&name=${user.firstName && user.lastName ? `${user.firstName}+${user.lastName}` : user.email
      }`
  );
  const { handleLogout } = useLogin();

  const [anchorEl, setAnchorEl] = useState(null);
  const [textButtons, setTextButtons] = useState([]);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (btnType) => {
    switch (btnType) {
      case "profile":
        navigate(`/user/${user._id}`);
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const btnClick = (btnType) => {
    switch (btnType) {
      case "Admin":
        navigate("/org/01J1YYTREJWYS6AMSK511AG3ZS");
        break;
      case "Settings":
        navigate("/user-settings");
        break;
      case "Login":
        navigate("/login");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const buttons = [];
    if (isAdmin) {
      buttons.push("Admin");
    }
    if (Object.keys(user).length === 0) {
      buttons.push("Login");
    } else {
      buttons.push("Settings");
    }
    setTextButtons(buttons);
  }, [user, isAdmin]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ backgroundColor: 'white', padding: '0.5em', display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src={logoFull}
            style={{ cursor: 'pointer', width: 'auto', height: '40px' }}
            alt="Logo" onClick={() => navigate("/home")}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {textButtons.map((btnTxt) => (
            <Button key={btnTxt} onClick={() => btnClick(btnTxt)} sx={{ color: 'black', marginLeft: 2 }}>{btnTxt}</Button>
          ))}

          {Object.keys(user).length > 0 && (
            <>
              <IconButton color="inherit" onClick={handleMenuClick} sx={{
                borderRadius: '2rem',
                '&:focus': {
                  outline: 'none',
                },
                '&:active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Subtle gray overlay
                },
              }}>
                <Avatar alt="Avatar" src={profilePicture} />
                <ArrowDropDown sx={{ color: 'black' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleMenuItemClick("profile")}>Profile</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("logout")}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
