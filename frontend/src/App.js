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
import getDesignTokens from './helpers/getDesignTokens';

// DELETE?
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact="/explore" element={<ExplorePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        
        <IconButton onClick={colorMode.toggleColorMode} >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </BrowserRouter>
  );
}



export default function ToggleColorMode() {
  const [mode, setMode] = React.useState(() => {
    const storedMode = localStorage.getItem('mode');
    return storedMode || 'light';
  });

  const colorMode = React.useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    localStorage.setItem('mode', mode);
}, [mode]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}




