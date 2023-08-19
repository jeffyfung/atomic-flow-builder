import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Drawboard } from "./components/drawboard/drawboard";
import { ThemeProvider } from "@mui/material";
import { colorTheme } from "./config";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={colorTheme}>
        <div className="App">
          <Router>
            <Routes>
              {/* <Route path="/" element={<Welcome/>}/> */}
              <Route path="/" element={<Drawboard />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
