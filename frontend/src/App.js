import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles"
import { Box, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material';

import LandingPage from "./pages/landingPage"
import FeedPage from "./pages/feedPage"
import ExplorePage from "./pages/explorePage"
import WishListPage from "./pages/wishListPage"
import AccountPage from "./pages/accountPage"


// DELETE?
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Copyright(props) {
  return (
    <Typography variant="body1" underline="hover" color="secondary" align="center" {...props}>
      {'©'}{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
function About(props) {
  return (
    <Typography variant="body1" underline="hover" color="secondary" align="center">
      {'About '}
      <Link color="inherit" href="https://mui.com/">
        trnds
      </Link>{' '}
    </Typography>
  );
}

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // LIGHT mode
          primary: {
            main: "#000000"
          },
          secondary: {
            main: "rgb(100,100,100,0.6)",
          },
          background: {
            default: "#FFFFFF",
            paper: "rgb(255,255,255,0.25)",
          },
          text: {
            primary: "#000000",
            secondary: "#EE4B2B",
          },
        }
      : {
          // DARK mode
          primary: {
            main: "#FFFFFF",
          },
          secondary: {
            main: "rgb(255,255,255,0.5)",
          },
          background: {
            default: "#000000",
            paper: "rgb(0,0,0,0.25)",
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#DE3163',
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiSvgIcon: {
      // defaultProps: {
      //   htmlColor: 'primary' // Use the color from the theme palette
      // }
      mode,
      ...(mode === 'light'
      ? {
          // LIGHT mode
          defaultProps: { htmlColor: 'black'}
        }
      : {
          // DARK mode
          defaultProps: { htmlColor: 'white'}
        }),
    },
    MuiAppBar: {
      styleOverrides: {
        root:{
          WebkitBackdropFilter: 'saturate(150%) blur(20px)',
          backdropFilter: 'saturate(150%) blur(20px)',
          boxShadow: 'none', 
        }
      },
      defaultProps: {
        color: "background",
        hideBackdrop: true,
        elevation: 0
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root:{
            '& .MuiIconButton-root': {
              padding: '16px 23px',
              alignItems: "start"
            },
            '& .MuiTypography-root': {
              paddingLeft: "16px",
              fontSize: "large"
            },
            // '& .MuiSvgIcon-root': {
            //   paddingLeft: "14px",
            //   fontSize: "25px"
            // },
        },
        paper: {
          WebkitBackdropFilter: 'saturate(150%) blur(20px)',
          backdropFilter: 'saturate(150%) blur(20px)',
          boxShadow: 'none',
          height:"100%",
        },
      },
      defaultProps: {
        hideBackdrop: true,
        elevation: 0
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: "primary",
            borderRadius: 5,
          },
          '& .MuiInputBase-input::placeholder': {
            fontSize:"medium",
            fontWeight:"300",
          },
          '& .MuiInputBase-input': {
            fontSize:"medium",
            fontWeight:"300",
          },
        },
      },
      defaultProps: {
        color: "secondary",
        variant: "filled",
        size: "large",
        hiddenLabel: true,
        InputProps: { disableUnderline: true, },
        InputLabelProps: { size: "small"},
        margin: "dense"
      },
    },
    MuiButton:{
      styleOverrides: {
        root:{
          borderRadius: 5,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: "medium",
          padding: '15px 30px',
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        size: "large",
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root:{
          borderRadius: 0,
          '&:hover': {
            '& .MuiTypography-root': {
              color:  alpha( mode === 'light' ? '#000000' : '#ffffff', 0.5),
            },
            '& .MuiSvgIcon-root': {
              color: alpha( mode === 'light' ? '#000000' : '#ffffff', 0.5),
            }
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    p: {
      color: mode === 'light' ? '#000000' : '#ffffff'
    },
    h4: {
      color: mode === 'light' ? '#000000' : '#ffffff',
    },
    h5: {
      color: mode === 'light' ? '#000000' : '#ffffff',
      letterSpacing: '0.02em', 
    },
    body1: {
      color: mode === 'light' ? '#000000' : '#ffffff',
      fontWeight:"300",
      fontSize:"small",
    },
    body2: {
      color: mode === 'light' ? '#000000' : '#ffffff',
      fontWeight:"300",
      fontSize:"medium",
    },
    subtitle: {
      color: mode === 'light' ? '#000000' : '#ffffff',
      fontWeight: 700
    },
  },
});

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact="/explore" element={<ExplorePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            mr: 1,
            ml: 1
        }}>
          <About/>
          <Copyright/>
        </Box>

        <IconButton onClick={colorMode.toggleColorMode} >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </BrowserRouter>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}




