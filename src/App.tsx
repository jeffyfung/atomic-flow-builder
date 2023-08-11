import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Drawboard } from "./components/drawboard/drawboard";
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "./config";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
