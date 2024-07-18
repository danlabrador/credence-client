import { useTheme } from '@mui/material/styles';
import { Container, Box, Typography, Avatar, Link, IconButton } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import PublicIcon from '@mui/icons-material/Public';
import { useContext, useState } from 'react';
import MyContext from '../../MyContext';

const PersonalDetails = ({ userData }) => {
  const theme = useTheme();
  const { user, isAdmin } = useContext(MyContext);
  const [profilePicture, setProfilePicture] = useState(
    user.profilePic && user.profilePic.path ? user.profilePic.path :
      `https://ui-avatars.com/api/?background=4208de&color=fff&name=${user.firstName && user.lastName ? `${user.firstName}+${user.lastName}` : user.email
      }`
  );

  return (
    Object.keys(userData).length !== 0 &&
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Container
        sx={{
          width: '20vw',
          mt: 15,
          mr: 4,
          backgroundColor: 'white',
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Avatar
          alt="Avatar"
          src={profilePicture}
          sx={{ width: 150, height: 150, mb: 2 }}
        />
        <Typography variant="h4" sx={{ textAlign: 'center', color: theme.palette.texts.main }}>{`${userData.firstName} ${userData.lastName}`}</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: theme.palette.texts.main }}>{userData.bio}</Typography>
      </Container>

      {(userData.currentPosition || userData.currentEmployer) && <Container
        sx={{
          width: '20vw',
          mr: 4,
          backgroundColor: 'white',
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 1
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.texts.main }}>Additional Details</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {userData.currentPosition && (
            <Typography variant="body1" sx={{ color: theme.palette.texts.main }}>
              {`${userData.currentPosition}`}
            </Typography>
          )}
          {userData.currentEmployer && (
            <Typography variant="body1" sx={{ color: theme.palette.texts.main }}>
              {`${userData.currentEmployer}`}
            </Typography>
          )}
        </Box>
      </Container>}

      <Container
        sx={{
          width: '20vw',
          mr: 4,
          backgroundColor: 'white',
          boxShadow: 3,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 1
        }}
      >
        <Typography variant="h5" sx={{ color: theme.palette.texts.main }}>Links</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {userData.fbUrl && (
            <Link href={userData.fbUrl} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>Facebook</Typography>
            </Link>
          )}
          {userData.linkedinUrl && (
            <Link href={userData.linkedinUrl} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
              <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>LinkedIn</Typography>
            </Link>
          )}
          {userData.xUrl && (
            <Link href={userData.xUrl} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                <XIcon />
              </IconButton>
              <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>Twitter</Typography>
            </Link>
          )}
          {userData.websiteUrl && (
            <Link href={userData.websiteUrl} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                <PublicIcon />
              </IconButton>
              <Typography variant="body2" sx={{ color: theme.palette.texts.main }}>Website</Typography>
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PersonalDetails;
