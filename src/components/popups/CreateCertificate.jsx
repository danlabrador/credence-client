import { Box, Typography, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import TagsInput from '../objects/TagsInput'; 

import useCertificate from '../../hooks/useCertificate';

const CreateCertificate = ({ open, onClose }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      skills: [],
    },
  });
  const { error, loading, handleCreateCertificate } = useCertificate();

  const onSubmit = async data => {
    const toSubmit = {
      certificateName: data.name,
      certificateCriteria: data.criteria,
      certificateDesc: data.description,
      certificateUrl: data.url,
      skills: data.skills.join(';;'),
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      organizationId: '01J1YYTREJWYS6AMSK511AG3ZS'
    };
    await handleCreateCertificate(toSubmit);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Create a New Certificate</DialogTitle>
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
          <Typography variant="h4">Create a New Certificate</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ width: '35%' }}>
              
            </Box>

            <Box sx={{ width: '65%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                fullWidth
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Criteria"
                fullWidth
                {...register('criteria', { required: 'Criteria is required' })}
                error={!!errors.criteria}
                helperText={errors.criteria?.message}
              />
              <TextField
                label="URL"
                fullWidth
                {...register('url', { required: 'URL is required' })}
                error={!!errors.url}
                helperText={errors.url?.message}
              />
              <TagsInput
                selectedTags={tags => setValue('skills', tags)}
                initialTags={[]}
                placeholder="Add skills"
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <TextField
                label="Issue Date"
                type="date"
                fullWidth
                {...register('issueDate', { required: 'Issue date is required' })}
                error={!!errors.issueDate}
                helperText={errors.issueDate?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                {...register('expiryDate')}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCertificate;
