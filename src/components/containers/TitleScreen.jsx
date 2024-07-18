import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TitleScreen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60vw',
        height: '100vh',
      }}
    >

    </Box>
  );
};

export default TitleScreen;
