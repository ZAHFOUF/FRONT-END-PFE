/* eslint-disable react/self-closing-comp */
/* eslint-disable import/extensions */
import { Helmet } from 'react-helmet-async';
import { useEffect , useState } from 'react';
import OtpInput from 'react-otp-input';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
import  LoginForm from '../sections/auth/login/LoginForm.js';
// sections




// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const [otpCase,setOtpCase] = useState(false)

 

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

  <StyledRoot>
  {
  ! otpCase &&
  <Logo
    sx={{
      position: 'fixed',
      top: { xs: 16, sm: 24, md: 40 },
      left: { xs: 16, sm: 24, md: 40 },
    }}
  />
}

{
  ! otpCase &&

  mdUp && 
    <StyledSection style={{backgroundColor:"#FFF"}}>
      <img className='lg_im' src="/assets/illustrations/7140739_3515462.jpg" alt="login" />
    </StyledSection>
  
  }
  <Container maxWidth="sm">

    
    <StyledContent>
    { ! otpCase &&
      <Typography style={{fontSize:"40px",textAlign:"center"}} variant='h2' sx={{ px: 2, mt: 10, mb: 5  }}> Welcome To the App</Typography>
    }
          <div id='recaptcha-container'></div>

      <LoginForm otpCase={otpCase} setOtpCase={setOtpCase} />
    </StyledContent>
  </Container>
</StyledRoot>




      
    </>
  );
}
