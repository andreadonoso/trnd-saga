import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Header from "./components/header"
import FeedPage from "./pages/feedPage"
import ExplorePage from "./pages/explorePage"
import WishListPage from "./pages/wishListPage"
import AccountPage from "./pages/accountPage"

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#AAAAAA"
    },
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
      defaultProps: {
        htmlColor: 'black', 
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root:{
          backgroundColor: 'rgb(255,255,255,0.2)',
          WebkitBackdropFilter: 'saturate(250%) blur(20px)',
          backdropFilter: 'saturate(250%) blur(20px)',
          boxShadow: 'none', 
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root:{
          backgroundColor: 'transparent',
            '& .MuiIconButton-root': {
              padding: '16px 23px',
              alignItems: "start"
            },
            '& .MuiTypography-root': {
              paddingLeft: "16px",
              fontSize: "large"
            },
            '& .MuiSvgIcon-root': {
              paddingLeft: "14px",
              fontSize: "25px"
            }
        },
        paper: {
          backgroundColor: 'rgb(255,255,255,0.8)',
          WebkitBackdropFilter: 'saturate(250%) blur(20px) brightness(120%)',
          backdropFilter: 'saturate(250%) blur(20px) brightness(120%)',
          boxShadow: 'none',
          height:"100%"
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root:{
          borderRadius: 0,
          
          // backgroundColor: 'transparent',
          '&:hover': {
            '& .MuiTypography-root': {
              color: 'rgb(0,0,0,0.6)',
            },
            '& .MuiSvgIcon-root': {
              color: 'rgb(0,0,0,0.6)',
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
      color: 'black',
    },
    h6: {
      color: 'black',
    },
    body1: {
      color: 'black',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<ExplorePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
