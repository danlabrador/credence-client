import { useEffect, useContext, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from "react-router-dom";

import useDataUser from "../hooks/useDataUser";
import useOrg from '../hooks/useOrg';
import MyContext from "../MyContext";

import Header from "../components/fixed/Header";
import NavBar from '../components/fixed/NavBar';
import OrgPage from '../components/containers/OrgPage';

const OrgScreen = () => {
    const theme = useTheme();
    const { user } = useContext(MyContext);

    const [ userData, setUserData ] = useState ({});
    const [ orgCerts, setOrgCerts ] = useState ({});
    const [ orgMembers, setOrgMembers ] = useState ([]);
    const [ ready, setReady ] = useState (false);

    const { error, handleGetUserData } = useDataUser();
    const { loading, handleGetOrgCertificates, handleGetOrgMembers } = useOrg();
    const { orgId } = useParams();

    useEffect(() => {
      loadAllData();
    }, []);

    const loadAllData = async () => {
      const getUserData = await handleGetUserData (user._id);
      setUserData (getUserData);

      const getOrgData = await handleGetOrgCertificates (orgId);
      setOrgCerts (getOrgData);
     
      const getOrgMembers = await handleGetOrgMembers (orgId);
      setOrgMembers (getOrgMembers);
      console.log (getOrgMembers);

      setReady (true);

      console.log (getOrgData);
    };

    return <>
        <Header />
        
        <Box sx={{ display: 'flex', width: '100vw'}}>
            <Box sx={{width: '100vw',
                marginTop: 4,
                backgroundColor: 'white',
                boxShadow: 3,
                padding: 4,
                display: 'flex',
                flexFlow: 'column',
                gap: 2}}>
                  {!ready ? <>
                    <Typography variant="h3" align="left" sx={{ mt: 4, ml: 8, color: theme.palette.text.primary }}>Loading...</Typography>
                  </> : <>
                    <OrgPage orgId={orgId} orgCerts={orgCerts} orgMembers={orgMembers} loadAllData={loadAllData}/>
                  </>}
            </Box>
        </Box>
    </>
}

export default OrgScreen;