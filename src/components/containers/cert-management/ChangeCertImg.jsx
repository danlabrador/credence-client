import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ChangeCertImg = () => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4, color: theme.palette.texts.main }}>Certificate Image</Typography>
      <Paper sx={{ width: '50%', padding: 3, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 3 }}>
          <Avatar
            src={selectedImage}
            alt="Selected Avatar"
            sx={{ width: 200, height: 200, borderRadius: '50%', marginBottom: 2 }}
          >
            {selectedImage ? '' : 'A'}
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Button
            variant="text" component="label"
            sx={{ color: theme.palette.primary.main, textTransform: 'none', marginBottom: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, textTransform: 'none' }}>Change Avatar</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeCertImg;
