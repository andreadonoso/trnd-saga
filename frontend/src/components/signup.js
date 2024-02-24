import * as React from 'react';
import { Button, TextField, Box, Link, Grid } from '@mui/material';

const SignupPage = ({ handleClick }) => {
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
          placeholder= "Email"
          inputProps={{ 'aria-label': 'username' }}
          name="username"
          autoComplete="username"
        />
        <TextField
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
          Sign Up
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link onClick={() => {handleClick('Log In')}} variant="body2" underline="hover" color="secondary">
              {"Already have an account?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
     );
}
 
export default SignupPage;