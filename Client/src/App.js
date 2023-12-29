import "./App.css";
import Headers from "./components/layout/Header/Headers.js";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "sans-serif"],
      },
    });
  }, []);
  
  return (
    <Router>
      <Headers />
    </Router>
  );
}

export default App;
