import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from '../../features/auth/authSlice.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Grid } from '@mui/material';

const Signup = ({ handleClick }) => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;

  useEffect(() => {
    if(isError) toast.error(message);
    toast.clearWaitingQueue();

    // If success or the user is already logged in
    if(isSuccess || user) {
      toast.dismiss();
      navigate('/account');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  const onSubmit = (event) => {
    event.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasLetters = /[a-zA-Z]/;
    const hasNumbers = /\d/;
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    
    if(!email || !password || !confirmPassword) {
      toast.error("Please enter all fields");
      toast.clearWaitingQueue();
    }
    else if(!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      toast.clearWaitingQueue();
    }
    else if(password.length < 8) {
      toast.error("Password must have 8 - 20 characters");
      toast.clearWaitingQueue();
    }
    else if(!hasLetters.test(password) || !hasNumbers.test(password) || !hasSpecialChars.test(password)) {
      toast.error("Password must have letters, numbers and special characters");
      toast.clearWaitingQueue();
    }
    else if(password !== confirmPassword) {
      toast.error("Passwords don't match");
      toast.clearWaitingQueue();
    }
    else {
      const userData = { email, password };
      dispatch(register(userData));
    }
  }

  return ( 
      <form onSubmit={onSubmit} noValidate>
        <TextField name="email" type="email" id="email"
          fullWidth
          placeholder= "Email"
          inputProps={{ 'aria-label': 'email' }}
          autoComplete="email"
          onChange={onChange}
          value={email}
        />
        <TextField name="password" type="password" id="password"
          fullWidth
          placeholder="Password"
          inputProps={{ 'aria-label': 'password' }}
          autoComplete="current-password"
          onChange={onChange}
          value={password}
        />
        <TextField name="confirmPassword" type="password" id="confirmPassword"
          fullWidth
          placeholder="Confirm Password"
          inputProps={{ 'aria-label': 'password' }}
          autoComplete="current-password"
          onChange={onChange}
          value={confirmPassword}
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
      </form>
     );
}
 
export default Signup;