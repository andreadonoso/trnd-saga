import * as React from 'react';
import axios from 'axios';
import { Button, TextField, Box, Link, Grid } from '@mui/material';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

const Signup = ({ handleClick }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isLoggedIn: false
    }
  });

  const onSubmit = (data) => {
    try {
      axios.post("/api/users/register", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
            if (res.status === 201) 
            {
              localStorage.setItem("token", JSON.stringify(res.data.user.token));
              data.isLoggedIn = true;
              console.log('Registration successful:', res.data);
              if (data.isLoggedIn) 
              {
                navigate('/account'); 
              }
            }
        })
        .catch((err) => {
            console.error('Error registering user:', err);
      });
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return ( 
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <TextField
          fullWidth
          id="email"
          placeholder= "Email"
          inputProps={{ 'aria-label': 'email' }}
          name="email"
          autoComplete="email"
          {...register("email", {required: true})}
        />
        <TextField name="password" type="password" id="password"
          fullWidth
          placeholder="Password"
          inputProps={{ 'aria-label': 'password' }}
          autoComplete="current-password"
          {...register("password", {required: true, minLength: 8})}
        />
        <TextField name="confirmPassword" type="password" id="confirmPassword"
          fullWidth
          placeholder="Confirm Password"
          inputProps={{ 'aria-label': 'password' }}
          autoComplete="current-password"
          {...register("confirmPassword", {
            required: true, 
            minLength: {
              value: 8,
              message: "da min length is 8"
            },
          })}
        />
        <Button type="submit"
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
      </form>
     );
}
 
export default Signup;