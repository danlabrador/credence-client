import { Box, Typography, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';

import useDataUser from '../../hooks/useDataUser';

const AddNewAdmin = ({ open, orgId, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleAddUserToOrg } = useDataUser();

  const onSubmit = data => {
    handleAddUserToOrg(data.email, orgId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Admin</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <Typography variant="h5">Enter the new admin's email</Typography>
          <TextField
            label="Email"
            fullWidth
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewAdmin;
