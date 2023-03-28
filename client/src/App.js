import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/index';
import AdminContact from "./pages/AdminContact/index";
import Contact from "./pages/Contact/index";
import Admin from "./pages/AdminMain/index";
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import ProductDetails from "./pages/ProductDetails/index"
import Login from "./pages/Login/index";
import NoPage from "./pages/NoPage";
import Navbar from './components/navbar'
import Footer from './components/footer'
import AuthContext from './utils/AuthContext'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState("")
  const value = { isAuthenticated, setIsAuthenticated, user }

  // We check if user is already logged in, and if they are then we set isAuthenticated to true
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/logged-in');
      const data = await res.json();
      console.log(data.isAuthenticated)
      setIsAuthenticated(data.isAuthenticated)
      setUser(data.user)
      //setIsAuthenticated(false)

    }
    fetchData();
  }, [])
  return (
    <AuthContext.Provider value={value}>
      <div className="App">
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
                  <Route exact path="/shoppingCart" component={ShoppingCart} />
                  <Route exact path="/productDetails" component={ProductDetails} />
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
      </div>
    </AuthContext.Provider>
  );
}

export default App;
