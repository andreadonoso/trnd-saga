import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles"

import LandingPage from "./pages/landingPage"
import FeedPage from "./pages/feedPage"
import ExplorePage from "./pages/explorePage"
import WishListPage from "./pages/wishListPage"
import AccountPage from "./pages/accountPage"
import getDesignTokens from './helpers/getDesignTokens';

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
          <Route path="/account" element={<AccountPage colorMode={colorMode.toggleColorMode}/>} />
        </Routes>
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




