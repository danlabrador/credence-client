import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useLogin from "../../hooks/useLogin";
import { useForm } from 'react-hook-form';
import logoFull from '../../assets/logo-full.svg';

const LoginForm = () => {
  const theme = useTheme();
  const { error, loading, handleLogin } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data) => {
    handleLogin(data.email, data.password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '4rem',
          width: '400px',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexFlow: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <img src={logoFull} alt="Logo" style={{ height: '2.25rem', width: 'auto', marginBottom: '1rem' }} />
          <Typography variant="h1" sx={{ fontSize: '1.58rem', textAlign: 'left' }}>Sign In</Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>Manage your credentials with Credence.</Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            sx={{ marginBottom: '1rem' }}
          />
          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: theme.palette.primary.main, textTransform: 'none', fontSize: '1rem' }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
