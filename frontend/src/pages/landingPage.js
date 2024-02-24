import * as React from 'react';
import { useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { Container, CssBaseline, Box, Typography, Link } from '@mui/material';
import { useWindowDimensions } from "../helpers/Hooks";

import logoBlack from '../assets/logoBlack.png';
import logoWhite from '../assets/logoWhite.png';
import trndsBlack from '../assets/trndsBlack.png';
import trndsWhite from '../assets/trndsWhite.png';

import Login from "../components/login"
import Signup from "../components/signup"
import ForgotPassword from "../components/forgotPassword"

const LandingPage = () => {
    const theme = useTheme();
    const height = useWindowDimensions();

    const [title, setTitle] = useState("Log In");

    const handleClick = (title) => {
        setTitle(title);
    }

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
                    margin: 1,
                    mt: 9,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <img src={ theme.palette.mode === "light" ? logoBlack : logoWhite } alt="Logo" height="50px"/>
                    <Typography variant="subtitle" sx={{ mt: 3.3 }}>{ title }</Typography>
                </Box>
                {title === 'Log In' && <Login handleClick={handleClick}/>}
                {title === 'Sign Up' && <Signup handleClick={handleClick}/>}
                {title === 'Forgot Password' && <ForgotPassword handleClick={handleClick}/>}
            </Container>
            <img src={ theme.palette.mode === "light" ? trndsBlack : trndsWhite } alt="Logo" width="100%"/>
        </Box>
     );
}
 
export default LandingPage;


    