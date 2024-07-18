import { useState, useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from "react-router-dom";

import Header from "../components/fixed/Header";
import MainPage from '../components/containers/MainPage';
import PersonalDetails from '../components/containers/PersonalDetails';

import MyContext from '../MyContext';
import useDataUser from "../hooks/useDataUser";

const UserProfile = () => {
    const { user } = useContext(MyContext);
    const [ userData, setUserData ] = useState ({});
    const [ certs, setCerts ] = useState ([]);
    const { error, loading, handleGetUserData, handleGetUserCertifications } = useDataUser();
    const { userId } = useParams();

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        const getData = await handleGetUserData (userId);
        setUserData (getData);

        try {
            const getCerts = await handleGetUserCertifications(user._id);
            setCerts(getCerts);
        } catch (error) {
            console.error('Error getting certifications:', error);
        }
    };
    
    return <>
        <Header />
        
        <Box sx={{ display: 'flex', width: '98vw'}}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <PersonalDetails userData={userData} />
                <MainPage userData={userData} certs={certs} profileVisit='true' />
            </Box>
        </Box>
    </>
}

export default UserProfile;