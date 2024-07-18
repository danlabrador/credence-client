import { useState, useEffect, useContext } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

import Header from "../components/fixed/Header";
import NavBar from '../components/fixed/NavBar';

import CertificateAdminTabs from '../components/containers/CertificateAdminTabs';
import CertificateDetails from '../components/containers/CertificateDetails';
import UsersManagement from '../components/containers/UsersManagement';
import ChangeCertImg from '../components/containers/cert-management/ChangeCertImg';

import useCertificate from "../hooks/useCertificate";

const CertificateAdmin = () => {
  const [ certData, setCertData ] = useState ({});
  const [ openTab, setOpenTab ] = useState ("Details");

  const { error, loading, handleGetCertificate } = useCertificate();
  const { certId } = useParams();
  const theme = useTheme();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const getData = await handleGetCertificate (certId);
    console.log (getData);
    if (!Array.isArray(getData.skills)) {
      getData.skills = getData.skills.split(';;');
    }
    setCertData (getData);
  };

  const changeTab = (newTab) => {
    setOpenTab (newTab);
  };
  
  return <>
      <Header />
      
      {(certData != {}) ? <>
        <Box sx={{ 
          display: 'flex', 
          flexFlow: 'column', 
          width: '100vw', 
          minHeight: '100vh',
          pt: 10, pl: 6,
          backgroundColor: 'white',}}>
          <Typography variant="h3" sx={{ color: theme.palette.texts.main, mb: 2 }}>{`${certData.certificateName}`}</Typography>
          <Box sx={{ width: '90%', mx: 'auto', mt: 2, mb: 4, ml: 6, color: theme.palette.divider.main }}><Divider /></Box>
          <Box sx={{}}>
              <Box sx={{display: 'flex', flexFlow: 'row', gap: 4}}>
                <CertificateAdminTabs changeTab={changeTab} />

                {/* TABS */}
                {openTab === "Details"              && <CertificateDetails certData={certData} />}
                {openTab === "Certificate Image"    && <ChangeCertImg />}
                {openTab === "Users Management"     && <UsersManagement certData={certData} />}

              </Box>
          </Box>
        </Box>
      </> : <>
        <Typography variant="h3" sx={{ color: theme.palette.texts.main, mb: 2 }}>Loading...</Typography>
      </>}
  </>
}

export default CertificateAdmin;