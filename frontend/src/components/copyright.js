import { Typography } from "@mui/material";

function Copyright(props) {
    return (
      <Typography variant="body1" underline="hover" color="secondary" align="center" {...props}>
        {'©'}{' '}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  export default Copyright;