import React from "react";
import "./assets/App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Internships from "./components/Internships";
import Faq from "./components/Faq";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import privacy from "./components/privacy";
import ScrollToTop from "./services/ScrollToTop";
import terms from "./components/terms";

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/internships" component={Internships} />
          <Route path="/Faq" component={Faq} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={privacy} />
          <Route path="/terms" component={terms} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
