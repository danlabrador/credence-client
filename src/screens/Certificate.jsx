import { useState, useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/fixed/Header";
import NavBar from '../components/fixed/NavBar';
import CertificateMain from '../components/containers/CertificateMain';

import MyContext from '../MyContext';
import useDataUser from "../hooks/useDataUser";

const Certificate = () => {
    const { user } = useContext(MyContext);
    const { certId } = useParams();
    
    return <>
        <Header />
        
        <Box sx={{ display: 'flex', width: '100vw'}}>
            <Box sx={{width: '100vw',
                height: '90vh',
                marginTop: 4,
                backgroundColor: 'white',
                boxShadow: 3,
                padding: 4,
                display: 'flex',
                flexFlow: 'column',
                gap: 2}}>
                    <CertificateMain certId={certId} />
            </Box>
        </Box>
    </>
}

export default Certificate;