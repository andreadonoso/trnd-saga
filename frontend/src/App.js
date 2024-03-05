import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { ToastContainer, Slide } from 'react-toastify';

import Header from "./components/header"
import LandingPage from "./pages/landingPage"
import FeedPage from "./pages/feedPage"
import ExplorePage from "./pages/explorePage"
import WishListPage from "./pages/wishListPage"
import AccountPage from "./pages/accountPage"
import getDesignTokens from './helpers/getDesignTokens';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App({ mode }) {
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <ToastContainer 
        position="top-center"
        autoClose={4000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='colored'
        // theme={mode.toString()}
        transition={Slide}
        limit={1}
        // toastStyle={{
        //   backgroundColor: 'rgba(173,12,0,1)', 
        // }}
      />
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/account" element={<AccountPage colorMode={colorMode.toggleColorMode}/>} />
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
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
        <App mode={mode}/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}