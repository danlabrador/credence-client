import { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CardCertificate from '../objects/CardCertificate';

import useDataUser from '../../hooks/useDataUser';

const MainPage = ({ userData, certs, profileVisit }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '70vw',
        minHeight: '100vh',
        marginTop: 15,
        marginRight: 2,
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 2,
      }}
    >
      {Object.keys(userData).length !== 0 &&
        <>
          <Typography variant="h1" align="left" sx={{ mt: 4, mx: 8, color: theme.palette.texts.main, fontSize: '3em', fontWeight: 'bold' }}>
            {profileVisit === 'true' ? `${userData.firstName}'s profile` : `Welcome, ${userData.firstName}!`}
          </Typography>
          <Box sx={{ width: '90%', mx: 'auto', mt: 2, color: theme.others.dividerLine }}>
            <Divider />
          </Box>
          <Typography variant="h5" align="left" sx={{ mt: 4, mx: 8, color: theme.palette.texts.main }}>
            {profileVisit === 'true' ? `Credentials:` : `Your credentials:`}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', justifyContent: 'flex-start', mt: 4, mx: 8 }}>
            {certs.map((cert, idx) =>
              <CardCertificate credId={cert._id} certificateName={cert.certificate.name} certificateDesc={cert.certificate.description} key={`cert-${idx}`} />
            )}
          </Box>
        </>
      }
    </Box>
  );
};

export default MainPage;
