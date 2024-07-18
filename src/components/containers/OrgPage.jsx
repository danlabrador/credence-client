import { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CardCertificateAdmin from '../objects/CardCertificateAdmin';
import CreateCertificate from '../popups/CreateCertificate';

import AdminsTable from './organization-page/AdminsTable';
import AddNewAdmin from '../popups/AddNewAdmin';

const OrgPage = ({ orgId, orgCerts, orgMembers, loadAllData }) => {
  const [showCreateCert, setShowCreateCert] = useState (false);
  const [showAddAdmin, setShowAddAdmin] = useState (false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '93vw',
        minHeight: '100vh',
        marginTop: 4,
        marginRight: 2,
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 2,
      }}
    >
      <Typography variant="h2" align="left" sx={{ mt: 4, ml: 8, color: "#60a9a2" }}>
        Uplift Code Camp
      </Typography>
      <Box sx={{ width: '90%', mx: 'auto', mt: 2, color: theme.palette.divider.main }}>
        <Divider />
      </Box>

      <Typography variant="body1" align="left" sx={{ mt: 4, ml: 8, color: theme.palette.texts.main }}>
        A top coding bootcamp in the Philippines. The best training school to learn programming, IT and full-stack web development.
      </Typography>
      
      <Box sx={{ width: '90%', mx: 'auto', mt: 2, color: theme.palette.divider.main }}>
        <Divider />
      </Box>

      <AdminsTable orgMembers={orgMembers} setShowAddAdmin={setShowAddAdmin} />
      <Box sx={{ width: '90%', mx: 'auto', mt: 2, color: theme.palette.divider.main }}>
        <Divider />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, ml: 2, mr: 8 }}>
        <Typography variant="h5" align="left" sx={{ color: theme.palette.texts.main }}>
          Organization credentials:
        </Typography>
        <Button color="primary" variant="contained" onClick={()=>setShowCreateCert(true)}>
          Add Credential
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', justifyContent: 'flex-start', mt: 2 }}>
        {orgCerts.map ((cert)=>
          <CardCertificateAdmin 
            certName={cert.certificateName} 
            certDesc={cert.certificateDesc} 
            certId={cert._id}
          />
        )}
      </Box>
      <CreateCertificate open={showCreateCert} onClose={()=>{
        setShowCreateCert(false);
        loadAllData();
      }} />
      <AddNewAdmin open={showAddAdmin} orgId={orgId} onClose={()=>{
        setShowAddAdmin(false);
        loadAllData();
      }} />
    </Box>
  );
};

export default OrgPage;
