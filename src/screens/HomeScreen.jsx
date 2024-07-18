import { useState, useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';

import Header from "../components/fixed/Header";
import MainPage from '../components/containers/MainPage';
import PersonalDetails from '../components/containers/PersonalDetails';

import MyContext from '../MyContext';
import useDataUser from "../hooks/useDataUser";

const HomeScreen = () => {
  const { user, setIsAdmin } = useContext(MyContext);
  const [userData, setUserData] = useState({});
  const [certs, setCerts] = useState([]);
  const { error, loading, handleGetUserData, handleGetUserCertifications } = useDataUser();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      const getData = await handleGetUserData(user._id);
      setUserData(getData);
      setIsAdmin(getData.role && getData.role == "Admin");
    }

    try {
      const certs = await handleGetUserCertifications(user._id);
      setCerts(certs);
    } catch (error) {
      console.error('Error getting certifications:', error);
    }
  };

  return <>
    <Header />
    <Box sx={{ display: 'flex', width: '98vw' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', backgroundColor: '#faf9f9' }}>
        <PersonalDetails userData={userData} />
        <MainPage userData={userData} certs={certs} profileVisit='false' />
      </Box>
    </Box>
  </>
}

export default HomeScreen;