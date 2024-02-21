import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Container, CssBaseline, TextField, Link, Grid, Box, Typography } from '@mui/material';
import { useWindowDimensions } from "../helpers/Hooks";

import logoBlack from '../assets/logoBlack.png';
import logoWhite from '../assets/logoWhite.png';
import trndsBlack from '../assets/trndsBlack.png';
import trndsWhite from '../assets/trndsWhite.png';

const LoginPage = () => {
  const theme = useTheme();

  const height = useWindowDimensions();

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
      username: data.get('username'),
      password: data.get('password'),
      });

  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: {height}
      }}
    >
      <Typography variant="subtitle"></Typography>
      <Container component="main" maxWidth="xs"> 
        <CssBaseline />
        <Box
          sx={{
            margin: 3,
            mt: 9,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={ theme.palette.mode === "light" ? logoBlack : logoWhite } alt="Logo" height="50px"/>
          <Typography variant="subtitle" sx={{ mt: 3 }}>Log In</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate >
            <TextField
              margin="normal"
              fullWidth
              id="username"
              placeholder= "Username, phone or email"
              inputProps={{ 'aria-label': 'username' }}
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              InputProps={{ disableUnderline: true }}
              margin="none"
              fullWidth
              name="password"
              placeholder="Password"
              inputProps={{ 'aria-label': 'password' }}
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1.1, mb: 1.5 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" underline="hover" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" underline="hover" color="secondary">
                  {"Create an account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <img src={ theme.palette.mode === "light" ? trndsBlack : trndsWhite } alt="Logo" width="100%"/>
      </Box>
  );
}
 
export default LoginPage;