import { Box } from '@mui/material';
import LoginForm from "../components/containers/LoginForm";
import TitleScreen from '../components/containers/TitleScreen';
import loginBackground from '../assets/login-background.png';


const Login = () => {
    return <>
        <Box sx={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': { // Pseudo-element for the overlay
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1,
            }
        }}>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4, position: 'relative', zIndex: 2 }}>
                <LoginForm />
            </Box>
        </Box>
    </>
}

export default Login;