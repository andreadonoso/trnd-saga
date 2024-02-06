import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const LogoBar = () => {
    return ( 
        <AppBar 
        position="static" 
        elevation={0} 
        sx={{
            backgroundColor: '#00000000',
            WebkitBackdropFilter: 'saturate(0%) blur(20px)',
            backdropFilter: 'saturate(0%) blur(20px)',
          }}>
        <Container maxWidth="xl">
          <Toolbar style={{ justifyContent: 'center' }}>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'bowlby one',
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            trnds
          </Typography>
          </Toolbar>
        </Container>
      </AppBar>
     );
}
 
export default LogoBar;