import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import useDataUser from '../../../hooks/useDataUser';

const UserPrivacy = ({ userData }) => {
  const theme = useTheme();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleUpdateUserData } = useDataUser();
  const onSubmit = data => {
    handleUpdateUserData(data, userData._id);
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
      <Typography variant="h3" sx={{ mb: 4, color: theme.palette.texts.main }}>Privacy and Security</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ p: 3, border: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.palette.texts.main }}>Change Password</Typography>
          <TextField
            label="New Password"
            fullWidth
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            error={!!errors.password}
            helperText={errors.password ? 'Password must be at least 6 characters' : ''}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Set New Password
          </Button>
        </Paper>
      </form>
    </Box>
  );
};

export default UserPrivacy;
