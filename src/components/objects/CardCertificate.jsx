import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

import upliftLogo from '../../assets/uplift-logo.png';

const CardCertificate = ({ credId, certificateName, certificateDesc }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onClickCertificate = () => {
    navigate(`/certificate/${credId}`);
  }

  const truncatedDesc = certificateDesc.length > 100 ? `${certificateDesc.slice(0, 100)}...` : certificateDesc;

  return (
    <Paper
      sx={{
        display: 'flex',
        gap: 5,
        backgroundColor: 'white',
        border: '4px solid #ccc',
        p: 2,
        borderRadius: 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
      onClick={() => onClickCertificate()}
    >
      <img
        src={upliftLogo}
        alt="Logo"
        style={{ width: 'auto', height: '100px', marginLeft: 'auto' }}
      />

      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{certificateName}</Typography>
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

export default CardCertificate;
