import * as React from 'react';
import { useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { Container, CssBaseline, Box, Typography, Fade } from '@mui/material';
import { useWindowDimensions } from "../helpers/hooks";

import logoBlack from '../assets/logoBlack.png';
import logoWhite from '../assets/logoWhite.png';
import trndsBlack from '../assets/trndsBlack.png';
import trndsWhite from '../assets/trndsWhite.png';

import Login from "../components/auth/login"
import Signup from "../components/auth/signup"
import ResetPassword from "../components/auth/resetPassword"
import Copyright from "../components/copyright";
import About from "../components/about";

const LandingPage = () => {
    const theme = useTheme();
    const height = useWindowDimensions();

    const [title, setTitle] = useState("Log In");
    const [checked, setChecked] = React.useState(true);

    const handleClick = (title) => {
        setChecked((prev) => !prev);
        setTimeout(() => {
            setChecked((prev) => !prev)
            setTitle(title);
        }, 300);
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
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width:"100%",
                pr: 1,
                pl: 1,
                pt: 0.5
            }}>
                <About/>
                <Copyright/>
            </Box>
            <Container component="main" maxWidth="xs"> 
                <CssBaseline />
                <Box
                sx={{
                    ml: 3,
                    mr: 3,
                    mt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <img src={ theme.palette.mode === "light" ? logoBlack : logoWhite } alt="Logo" height="50px"/>
                    <Fade in={checked} timeout={500}>
                        <Box
                        sx={{
                            minHeight:'380px',
                        }}
                        >
                            <Box
                            sx={{
                                margin: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >         
                                <Typography variant="subtitle" sx={{ mt: 3.3 }}>{ title }</Typography>
                            </Box>
                            {title === 'Log In' && <Login handleClick={handleClick}/>}
                            {title === 'Sign Up' && <Signup handleClick={handleClick}/>}
                            {title === 'Reset Password' && <ResetPassword handleClick={handleClick}/>}
                        </Box>
                    </Fade>
                </Box>
            </Container>
            <img src={ theme.palette.mode === "light" ? trndsBlack : trndsWhite } alt="Logo" width="100%"/>
        </Box>
     );
}
 
export default LandingPage;


    