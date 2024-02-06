import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import LandingPage from "./pages/landingPage"

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
    <div className="App">
        {/* Navbar */}
      <div className="content">
        <LandingPage />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
