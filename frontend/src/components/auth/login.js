import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from '../../features/auth/authSlice.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Link, Grid } from '@mui/material';


const Login = ({ handleClick }) => {
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    credential: '',
    password: '',
  });

  const { credential, password } = formData;

  useEffect(() => {
    if(isError) toast.error(message);

    // If success or the user is already logged in
    if(isSuccess || user) navigate('/account');

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, navigate, dispatch])


  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  };

  const onSubmit = (event) => {
    event.preventDefault()
    if(!credential || !password) {
      toast.error("Please enter all fields");
    }
    else {
      const userData = { credential, password };
      dispatch(login(userData));
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <TextField name="credential" type="credential" id="credential"
        fullWidth
        placeholder= "Username or email"
        inputProps={{ 'aria-label': 'credential' }}
        autoComplete="username"
        onChange={onChange}
        value={credential}
      />
      <TextField name="password" type="password" id="password"
        fullWidth
        placeholder="Password"
        inputProps={{ 'aria-label': 'password' }}
        autoComplete="current-password"
        onChange={onChange}
        value={password}
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
    </form>
  );
}
 
export default Login;