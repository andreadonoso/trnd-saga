import * as React from 'react';
import { Button, TextField, Link, Grid, Box, } from '@mui/material';

const LoginPage = ({ handleClick }) => {
  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
      username: data.get('username'),
      password: data.get('password'),
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate >
      <TextField
        fullWidth
        id="username"
        placeholder= "Username or email"
        inputProps={{ 'aria-label': 'username' }}
        name="username"
        autoComplete="username"
      />
      <TextField
        InputProps={{ disableUnderline: true }}
        fullWidth
        name="password"
        placeholder="Password"
        inputProps={{ 'aria-label': 'password' }}
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1.2, mb: 1.5 }}
      >
        Log In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link onClick={()=>{handleClick('Reset Password')}} variant="body2" underline="hover" color="secondary">
            {"Forgot password?"}
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={()=>{handleClick('Sign Up')}} variant="body2" underline="hover" color="secondary">
            {"Create an account"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
 
export default LoginPage;