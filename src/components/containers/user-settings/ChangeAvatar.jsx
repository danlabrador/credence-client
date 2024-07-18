import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import useUpdateUser from '../../../hooks/useUpdateUser';

const ChangeAvatar = ({ userData }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { handleUserRefresh } = useUpdateUser(userData._id);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file); // Store the file for upload
    }
  };

  const handleChangeAvatar = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('profile-picture', imageFile); // Use the correct field name expected by your backend

      try {
        const response = await axios.patch(`https://credence-server-x3h2.onrender.com/api/v1/users/${userData._id}/profile-picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        handleUserRefresh(userData._id);
      } catch (error) {
        console.error('Error changing avatar:', error);
      }
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
      <Typography variant="h3" sx={{ mb: 4, color: theme.palette.texts.main }}>Change Avatar</Typography>
      <Paper sx={{ width: '50%', padding: 3, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: 3 }}>
          <Avatar
            src={selectedImage || userData.profilePic.path}
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
              name="profile-picture"
            />
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary.main, textTransform: 'none' }}
            onClick={handleChangeAvatar} // Call the function to change avatar
          >
            Change Avatar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangeAvatar;
