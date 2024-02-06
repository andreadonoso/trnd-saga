import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
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
    }
  }
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
