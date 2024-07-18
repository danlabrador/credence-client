import { useEffect, useContext } from 'react';
import { Box, Divider, Button, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import TagsInput from '../objects/TagsInput';

import MyContext from '../../MyContext';

import useCertificate from "../../hooks/useCertificate";

const CertificateDetails = ({ certData }) => {
  const theme = useTheme();
  const { error, loading, handleUpdateCertificate } = useCertificate();
  const { orgID } = useContext(MyContext);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      certificateName: certData.certificateName || '',
      certificateDesc: certData.certificateDesc || '',
      skills: certData.skills || [],
      certificateCriteria: certData.certificateCriteria || '',
    },
  });

  useEffect(() => {
    setValue('certificateName', certData.certificateName || '');
    setValue('certificateDesc', certData.certificateDesc || '');
    setValue('skills', certData.skills || []);
    setValue('certificateCriteria', certData.certificateCriteria || '');
  }, [certData, setValue]);

  const onSubmit = (data) => {
    const transformedData = {
      ...data,
      skills: data.skills.join(';;'),
      organizationId: orgID
    };
    handleUpdateCertificate(transformedData, certData._id);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <Box
      sx={{
        width: '67%',
        backgroundColor: 'white',
        boxShadow: 3,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 2, color: theme.palette.texts.main }}>Details</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ width: '50%' }}>
          <form onSubmit={handleSubmit(onSubmit)} onKeyPress={handleKeyPress}
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 10 }}>
            <TextField
              {...register('certificateName')}
              label="Name"
              variant="outlined"
              fullWidth
              value={watch('certificateName') || ''}
              InputLabelProps={{
                shrink: !!watch('certificateName'),
              }}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Issuer"
              variant="outlined"
              fullWidth
              defaultValue="Uplift Code Camp"
              InputProps={{ readOnly: true }}
              sx={{ mb: 1 }}
            />
            <TextField
              {...register('certificateDesc')}
              label="Description"
              variant="outlined"
              fullWidth
              value={watch('certificateDesc') || ''}
              InputLabelProps={{
                shrink: !!watch('certificateDesc'),
              }}
              multiline
              rows={4}
              sx={{ mb: 1 }}
            />
            <TagsInput
              selectedTags={tags => setValue('skills', tags)}
              initialTags={watch('skills') || []}
              placeholder="Add skills"
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              {...register('certificateCriteria')}
              label="Earning Criteria"
              variant="outlined"
              fullWidth
              value={watch('certificateCriteria') || ''}
              InputLabelProps={{
                shrink: !!watch('certificateCriteria'),
              }}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                mt: 3,
                width: '200px',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                }
              }}
              type="submit"
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default CertificateDetails;
