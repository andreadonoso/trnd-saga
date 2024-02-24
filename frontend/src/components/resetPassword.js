import * as React from 'react';
import { Button, TextField, Box, Grid, Link } from '@mui/material';

const ResetPassword = ({ handleClick }) => {
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
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1.2, mb: 1.5 }}
            >
            Reset Password
            </Button>
            <Grid container justifyContent="center">
                <Grid item>
                    <Link onClick={() => {handleClick("Log In")}} variant="body2" underline="hover" color="secondary">
                    {"Back to log in"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
     );
}
 
export default ResetPassword;