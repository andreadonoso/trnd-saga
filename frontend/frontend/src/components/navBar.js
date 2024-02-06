import { AppBar, Toolbar, Container, Box, InputBase, styled, alpha } from '@mui/material';
import { Link } from 'react-router-dom'

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
                    <Link to="/feed">Home</Link>
                    <Link to="/">Explore</Link>
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
                    <Link to="/wishlist"><ShoppingBagOutlinedIcon color="primary"/></Link>
                    <Link to="/account"><AccountCircleOutlinedIcon color="primary"/></Link>
                </Box>
            </Toolbar>
            {/* </Container> */}
            </AppBar>
        </Box>
     );
}
 
export default NavBar;