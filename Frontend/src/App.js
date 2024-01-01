import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.js"

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
      <Header />
      <Footer/>
    </Router>
  );
}

export default App;
