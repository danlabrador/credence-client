import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';

const AdminsTable = ({ orgMembers, setShowAddAdmin }) => {
  const theme = useTheme();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 }
  ];

  const rows = orgMembers ? orgMembers.map((member, index) => ({
    id: index + 1,
    fullName: `${member.firstName} ${member.lastName}`,
    email: member.email
  })) : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 4}}>
      <Box
        sx={{
          width: '67%',
          backgroundColor: 'white',
          boxShadow: 3,
          padding: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: theme.palette.texts.main, textAlign: 'center' }}>Organization Members</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Button variant="contained" color="primary" onClick={()=>setShowAddAdmin(true)}>
            Assign New Admin
          </Button>
        </Box>

        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminsTable;
