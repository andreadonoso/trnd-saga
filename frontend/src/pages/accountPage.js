import { useNavigate } from 'react-router-dom';
import {IconButton, Button, Box, CssBaseline} from '@mui/material/';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const AccountPage = ({colorMode}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth)


  useEffect(() => {
    // If is logged out, redirect
    if(!user) navigate('/');

    dispatch(reset());
  }, [user, dispatch, navigate])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/');
    }

    return ( 
        <Box>
            <CssBaseline />
            <IconButton onClick={colorMode} >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            Account Page
            <Button onClick={onLogout}>Log out</Button>
        </Box>
     );
}
 
export default AccountPage;