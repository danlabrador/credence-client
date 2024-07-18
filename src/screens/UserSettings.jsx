import { useEffect, useContext, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import useDataUser from "../hooks/useDataUser";
import MyContext from "../MyContext";

import Header from "../components/fixed/Header";
import NavBar from '../components/fixed/NavBar';

import UserSettingsTabs from '../components/containers/UserSettingsTabs';
import UserSettingsForm from '../components/containers/UserSettingsForm';
import UserPrivacy from '../components/containers/user-settings/UserPrivacy';
import ChangeAvatar from '../components/containers/user-settings/ChangeAvatar';

const UserSettings = () => {
  const theme = useTheme();
  const { user } = useContext(MyContext);
  const [userData, setUserData] = useState({});
  const [openTab, setOpenTab] = useState("Profile");
  const { error, loading, handleGetUserData } = useDataUser();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const getData = await handleGetUserData(user._id);
    setUserData(getData);
  };

  const changeTab = (newTab) => {
    setOpenTab(newTab);
  };

  return <>
    <Header />

    <Box sx={{ display: 'flex', width: '100vw' }}>
      <Box sx={{
        width: '100vw',
        height: '180vh',
        marginTop: 8,
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 4,
        display: 'flex',
        flexFlow: 'column',
        gap: 2
      }}>
        {loading ? <>
          <Typography variant="h3" align="left" sx={{ mt: 4, ml: 8, color: theme.palette.text.primary }}>Loading...</Typography>
        </> : <>
          <Typography variant="h3" align="left" sx={{ mt: 4, ml: 8, color: theme.palette.text.primary }}>User Settings</Typography>
          <Box sx={{ display: 'flex', flexFlow: 'row', gap: 4 }}>
            <UserSettingsTabs changeTab={changeTab} />
            <Box sx={{ width: '2px', height: '90%', mx: 'auto', mt: 0, color: theme.palette.divider.main }} />

            {/* TABS */}
            {openTab === "Profile" && <UserSettingsForm userData={userData} />}
            {openTab === "Avatar" && <ChangeAvatar userData={userData} />}
            {openTab === "Privacy and Security" && <UserPrivacy userData={userData} />}
          </Box>
        </>}
      </Box>
    </Box>
  </>
}

export default UserSettings;