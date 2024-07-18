import { Box, Typography, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import useDataUser from '../../hooks/useDataUser';

const AwardCertificate = ({ open, onClose, certID }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleAwardCertificate } = useDataUser();

  const onSubmit = data => {
    const submitData = {
      ...data,
      certificateId: certID,
      isPublic: true,
      acceptanceDate: new Date().toISOString(),
    };

    handleAwardCertificate(submitData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Award Certificate</DialogTitle>
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
          <Typography variant="h5">Enter the Certificate Recipient's details</Typography>
          <TextField
            label="User's Email"
            fullWidth
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Grade"
            fullWidth
            {...register('grade', { required: 'Grade is required' })}
            error={!!errors.grade}
            helperText={errors.grade?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AwardCertificate;
