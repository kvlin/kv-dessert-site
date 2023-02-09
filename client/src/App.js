import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/index';
import Testimonials from "./pages/Testimonials/index";
import Contact from "./pages/Contact/index";
import NoPage from "./pages/NoPage";
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  return (

<div className="App">
      <Navbar/>
      <div id="site-wrapper">
      <div className="row">
        <div id="main-container" className="col">
    <Router>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/testimonials" component={Testimonials} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NoPage} />
        </Switch>

  </Router>
        </div>
      </div>
      <div className="row">
        <Footer id="footer"/>
      </div>
    </div>
    </div>
   
  );
}

export default App;
