import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const CardCertificateAdmin = ({certName, certDesc, certId}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClickCertificate = () => {
    // TEMP
    navigate(`/certificate-admin/${certId}`);
  }

  const truncatedDesc = certDesc.length > 100 ? `${certDesc.slice(0, 100)}...` : certDesc;

  return (
    <Paper
      sx={{
        display: 'flex',
        gap: 5,
        minWidth: '400px',
        maxWidth: '400px',
        height: '200px',
        backgroundColor: theme.palette.credentialCard.backgroundColor,
        boxShadow: 3,
        p: 2,
        borderRadius: 2,
        cursor: 'pointer',
      }}
      onClick={() => onClickCertificate()}
    >
      <img 
        src="https://res.cloudinary.com/dm2hmj3rk/image/upload/v1719845379/logo-white_hqxmot.png" 
        alt="Logo" 
        style={{ width: 'auto', height: '100px'}}
      />

      <Box sx={{ display: 'flex', flexFlow: 'column',}}>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography variant="h4" sx={{  }}>{certName}</Typography>
        </Box>

        <Box sx={{ width: '80%', height: '50%', overflow: 'hidden' }}>
          <Typography variant="body2" sx={{ width: '100%', textOverflow: 'ellipsis', overflow: 'wrap' }}>
            {truncatedDesc}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CardCertificateAdmin;
