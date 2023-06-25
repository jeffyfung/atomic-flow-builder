import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Drawboard } from "./components/drawboard/drawboard";
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "./config";

const App = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <div className="App">
        <Router>
          <Routes>
            {/* <Route path="/" element={<Welcome/>}/> */}
            <Route path="/drawboard" element={<Drawboard />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;

{
  /* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.tsx</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */
}
