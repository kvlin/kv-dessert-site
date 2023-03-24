import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/index';
import AdminContact from "./pages/AdminContact/index";
import Contact from "./pages/Contact/index";
import Admin from "./pages/AdminMain/index";
import Login from "./pages/Login/index";
import NoPage from "./pages/NoPage";
import Navbar from './components/navbar'
import Footer from './components/footer'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AuthContext from './utils/AuthContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const value = { isAuthenticated, setIsAuthenticated }

  // We check if user is already logged in, and if they are then we set isAuthenticated to true
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/logged-in');
      const data = await res.json();
      console.log(data.isAuthenticated)
      setIsAuthenticated(data.isAuthenticated)
      //setIsAuthenticated(false)

    }
    fetchData();
  }, [])
  return (
    <AuthContext.Provider value={value}>
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Navbar />
          <div id="site-wrapper">
            <div className="row">
              <div id="main-container" className="col">
                <Router>

                  <Switch>
                    <Route exact path={['/']}>
                      {isAuthenticated
                        ? <Home /> : <Login />}
                    </Route>
                    <Route exact path={['/home']}>
                      {isAuthenticated
                        ? <Home /> : <Login />}
                    </Route>
                    <Route exact path="/testimonials" component={Admin} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path={['/logout']}>
                      <Login />
                    </Route>
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
    </AuthContext.Provider>
  );
}

export default App;
