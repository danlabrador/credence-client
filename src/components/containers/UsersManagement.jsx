import { useState, useEffect } from 'react';
import { Box, Button, Checkbox, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import AwardCertificate from '../popups/AwardCertificate';

import useCertificate from '../../hooks/useCertificate';
import { formatDate } from '../../utils/date-formatter';

const UsersManagement = ({ certData }) => {
  const [showAwardCert, setShowAwardCert] = useState (false);
  const [usersData, setUsersData] = useState([]);
  const {handleGetCertifications} = useCertificate();
  const theme = useTheme();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    const getData = await handleGetCertifications (certData._id);
    setUsersData (getData.data.map ((data) => {return {
      id: data.userId._id,
      fullName: `${data.userId.firstName} ${data.userId.lastName}`,
      email: data.userId.email, 
      awardedOn: formatDate (data.acceptanceDate), 
      grade: data.grade
    }}));
  };

  const columns = [
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'email', headerName: 'Email Address', flex: 1 },
    { field: 'awardedOn', headerName: 'Awarded On', flex: 1 },
    { field: 'grade', headerName: 'Grade Achieved', flex: 1 }
  ];

  return (
    <>
    <Box
      sx={{
        width: '67%',
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2, color: theme.palette.texts.main }}>Users Management</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Button variant="contained" color="primary" onClick={()=>setShowAwardCert(true)}>Assign User</Button>
      </Box>

      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={usersData}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[4]}
          checkboxSelection
        />
      </Box>
    </Box>
    <AwardCertificate open={showAwardCert} onClose={()=>setShowAwardCert(false)} certID={certData._id} />
    </>
  );
};

export default UsersManagement;
