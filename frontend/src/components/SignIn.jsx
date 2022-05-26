import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Plaid from './Plaid';
import background from '../images/signin-background.jpg';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br/>
      <Link color="inherit" href='https://www.freepik.com/vectors/startup-background'>
        Startup background vector created by rawpixel.com - www.freepik.com
      </Link>{' '}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    background: {
      default: 'url(' + background + ')',
      paper: 'rgba(255, 255, 255, 0.08)',
    },
  },
});

const SignIn = ({ setData }) => (
  <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', width: '100vw' }}>
      <CssBaseline />
      <Paper elevation={12} sx={{ p: 2, marginTop: 12, borderRadius: '10px' }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
            Budget Me 5000
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            To get started...
          </Typography>
          <Plaid setData={setData}/>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Paper>
    </Container>
  </ThemeProvider>
);

export default SignIn;