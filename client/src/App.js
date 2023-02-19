import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/index';
import Testimonials from "./pages/Testimonials/index";
import AdminContact from "./pages/AdminContact/index";
import Contact from "./pages/Contact/index";
import Admin from "./pages/AdminMain/index";
import NoPage from "./pages/NoPage";
import Navbar from './components/navbar'
import Footer from './components/footer'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (

    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <div id="site-wrapper">
          <div className="row">
            <div id="main-container" className="col">
              <Router>

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/testimonials" component={Admin} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/admin" component={Admin} />
                  <Route exact path="/adminContact" component={AdminContact} />
                  <Route component={NoPage} />
                </Switch>

              </Router>
            </div>
          </div>
          <div className="row">
            <Footer id="footer" />
          </div>
        </div>
      </DndProvider>
    </div>

  );
}

export default App;
