import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@mui/material/';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import SearchBar from "./searchBar";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TagIcon from '@mui/icons-material/Tag';

const Header = () => {
    const [state, setState] = useState(false);

    const theme = useTheme();
    const isBiggerScreenUp = useMediaQuery(theme.breakpoints.up('sm'));
    const isSmallScreenDowm = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
      setState(!state);
    };

    useEffect(() => {
      if(isBiggerScreenUp) setState(false);
    }, [isBiggerScreenUp])

    return ( 
      <AppBar position="static">
        <Toolbar sx={{ display:"flex", justifyContent: isBiggerScreenUp ? "center" : "space-between", alignItems: isBiggerScreenUp ? "end" : "center", }}>
            <Link to="/" style={{ textDecoration: 'none' }}> 
              <Typography
                aria-label="Logo"
                variant= {isBiggerScreenUp ? "h4" : "h5"}
                noWrap
                sx={{
                  fontFamily: 'bowlby one',
                  fontWeight: 700,
                  color: 'black',
                  textDecoration: 'none',
                  ml:1
                }}
              >
                trnds
              </Typography>
            </Link>
            {isBiggerScreenUp ? null :
            <>
              <Drawer
                variant="temporary"
                anchor={"top"}
                open={state}
                onClose={toggleDrawer}
                transitionDuration={500}
              >
                <IconButton onClick={ toggleDrawer } sx={{justifyContent: "end", alignItems: "start",}}>
                  <CloseOutlinedIcon sx={{fontSize:"5px"}}/>
                </IconButton>
                <Link to="/feed" onClick={ toggleDrawer } style={{ textDecoration: 'none' }}>
                  <IconButton aria-label="feed">
                    <HomeOutlinedIcon />
                    <Typography>Feed</Typography> 
                  </IconButton>
                </Link>
                <Link to="/" onClick={ toggleDrawer } style={{ textDecoration: 'none' }}>
                  <IconButton aria-label="explore">
                    <TagIcon />
                    <Typography>Explore</Typography> 
                  </IconButton>
                </Link>
                <Link to="/wishlist" onClick={ toggleDrawer } style={{ textDecoration: 'none' }}>
                  <IconButton aria-label="wishlist">
                    <ShoppingBagOutlinedIcon />
                    <Typography>Wishlist</Typography> 
                  </IconButton>
                </Link>
                <Link to="/account" onClick={ toggleDrawer } style={{ textDecoration: 'none' }}>
                  <IconButton aria-label="account">
                    <AccountCircleOutlinedIcon />
                    <Typography>Account</Typography> 
                  </IconButton>
                </Link>
              </Drawer>
              <IconButton onClick={ toggleDrawer }>
                <DragHandleOutlinedIcon sx={{fontSize:"25px"}}/>
              </IconButton>
              </>
            }
        </Toolbar>
        <Toolbar sx={{ justifyContent:"space-between", alignItems: isSmallScreenDowm ? "start" : "center"}}>
          {isSmallScreenDowm ? null :
            <div style={{ width: '150px', display:"flex", justifyContent:"start", alignItems:"end" }}>
                <Link to="/feed" style={{ textDecoration: 'none' }}>
                  <Typography variant="p" fontWeight="600" sx={{ mr:5 }}>Feed</Typography>
                </Link>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Typography variant="p" fontWeight="600">Explore</Typography>
                </Link>
            </div>
          }
          <SearchBar /> 
          {isSmallScreenDowm ? null :
            <div style={{ width: '150px', display:"flex", justifyContent:"end" }}>
                <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                    <ShoppingBagOutlinedIcon  />
                </Link>
                <Link to="/account">
                    <AccountCircleOutlinedIcon  sx={{ ml:5 }}/>
                </Link>
            </div>
          }
        </Toolbar>
      </AppBar>
     );
}
 
export default Header;