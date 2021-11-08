import React from "react";
import "./App.css";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Internships from "./Internships";
import Faq from "./Faq";
import Home from "./Home";
import Contact from "./Contact";
import Footer from "./Footer";
import privacy from "./privacy";
import ScrollToTop from "./ScrollToTop";
import terms from "./terms";

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
