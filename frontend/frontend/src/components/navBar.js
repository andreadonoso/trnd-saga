import { AppBar, Toolbar, Typography, Container, Box, InputBase, styled, alpha } from '@mui/material';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.10),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

const NavBar = () => {
    return ( 
        <Box>
            <AppBar 
            position="static" 
            elevation={0} 
            sx={{
                backgroundColor: '#00000000',
                WebkitBackdropFilter: 'saturate(0%) blur(20px)',
                backdropFilter: 'saturate(0%) blur(20px)',
            }}>
            {/* <Container maxWidth="xl"> */}
            <Toolbar sx={{justifyContent: "space-between"}}>
                <Box sx={{ display: "flex", width: "150px", justifyContent: "space-between"}}>
                    <Typography
                        variant="p"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                        // mr: 2,
                        // display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Roboto',
                        fontWeight: 100,
                        color: 'black',
                        textDecoration: 'none',
                        }}
                    >
                        Home
                    </Typography>
                    <Typography
                        variant="p"
                        noWrap
                        component="a"
                        href="/explore"
                        sx={{
                        // mr: 2,
                        // display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Roboto',
                        fontWeight: 100,
                        color: 'black',
                        textDecoration: 'none',
                        }}
                    >
                        Explore
                    </Typography>
                </Box>
                <Search > 
                    <SearchIconWrapper>
                        <SearchOutlinedIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box sx={{ display: "flex", width: "150px", justifyContent: "space-between"}}>
                    <ShoppingBagOutlinedIcon color="primary" size="large"
                    // edge="start"
                    // aria-label="menu"
                    // sx={{ mr: 2}}
                    />
                    <AccountCircleOutlinedIcon color="primary"/>
                </Box>
            </Toolbar>
            {/* </Container> */}
            </AppBar>
        </Box>
     );
}
 
export default NavBar;