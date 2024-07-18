import { useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import MyContext from '../../MyContext';
import useDataUser from "../../hooks/useDataUser";

const UserSettingsForm = ({ userData }) => {
  const theme = useTheme();
  const { user } = useContext(MyContext);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { error, loading, handleUpdateUserData } = useDataUser();

  useEffect(() => {
    setValue('firstName', userData?.firstName || '');
    setValue('middleName', userData?.middleName || '');
    setValue('lastName', userData?.lastName || '');
    setValue('bio', userData?.bio || '');
    setValue('email', userData?.email || '');
    setValue('birthYear', userData?.birthYear || '');
    setValue('city', userData?.city || '');
    setValue('country', userData?.country || '');
    setValue('zipCode', userData?.zipCode || '');
    setValue('currentEmployer', userData?.currentEmployer || '');
    setValue('currentPosition', userData?.currentPosition || '');
    setValue('websiteUrl', userData?.websiteUrl || '');
    setValue('fbUrl', userData?.fb_url || '');
    setValue('linkedinUrl', userData?.linkedinUrl || '');
    setValue('xUrl', userData?.x_url || '');
  }, [userData, setValue]);

  const onSubmit = data => {
    console.log(data);
    handleUpdateUserData(data, user._id);
  };

  /*
    TO DO: Text Fields could use some cleaning.
    Maybe make a seperate "const TextFieldSettingsForm" or a seperate component for the repeating text fields.
  */

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{}}>
          <Typography variant="h3" sx={{ mb: 4, color: theme.palette.texts.main }}>Profile</Typography>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName', { required: true })}
            defaultValue={userData?.firstName || ''}
            error={!!errors.firstName}
            helperText={errors.firstName ? 'First name is required' : ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Middle Name"
            fullWidth
            {...register('middleName')}
            defaultValue={userData?.middleName || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName', { required: true })}
            defaultValue={userData?.lastName || ''}
            error={!!errors.lastName}
            helperText={errors.lastName ? 'Last name is required' : ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={4}
            {...register('bio')}
            defaultValue={userData?.bio || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Email"
            fullWidth
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
            defaultValue={userData?.email || ''}
            error={!!errors.email}
            helperText={errors.email ? 'Valid email is required' : ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Birth Year"
            fullWidth
            type="number"
            {...register('birthYear', { required: true, min: 1900, max: new Date().getFullYear() })}
            defaultValue={userData?.birthYear || ''}
            error={!!errors.birthYear}
            helperText={errors.birthYear ? 'Valid birth year is required' : ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="City"
            fullWidth
            {...register('city')}
            defaultValue={userData?.city || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Country"
            fullWidth
            {...register('country')}
            defaultValue={userData?.country || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Zip Code"
            fullWidth
            {...register('zipCode')}
            defaultValue={userData?.zipCode || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 4, width: '60%' }}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.palette.texts.main }}>Employment</Typography>
          <TextField
            label="Current Employer"
            fullWidth
            {...register('currentEmployer')}
            defaultValue={userData?.currentEmployer || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Current Position"
            fullWidth
            {...register('currentPosition')}
            defaultValue={userData?.currentPosition || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 4, width: '60%' }}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.palette.texts.main }}>Links</Typography>
          <TextField
            label="Website URL"
            fullWidth
            {...register('websiteUrl')}
            defaultValue={userData?.websiteUrl || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="Facebook URL"
            fullWidth
            {...register('fbUrl')}
            defaultValue={userData?.fb_url || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="LinkedIn URL"
            fullWidth
            {...register('linkedinUrl')}
            defaultValue={userData?.linkedinUrl || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2, width: '60%' }}
          />
          <TextField
            label="X URL"
            fullWidth
            {...register('xUrl')}
            defaultValue={userData?.x_url || ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 4, width: '60%' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Submit
          </Button>
          <Link
            component="button"
            variant="body2"
            sx={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => { }}
          >
            Delete Account
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default UserSettingsForm;
