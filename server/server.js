const express = require('express');
const session = require("express-session");

const app = express();
const productRoutes = require('./routes/product-routes');
const imageRoutes = require('./routes/image-routes');
const PORT = process.env.PORT || 3001;
const passport = require("../config/passport");

// express middleware, used to be bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
// Initialize middleware, intialize passport
app.use(passport.initialize());
// Initialize middleware to alter the request object and deserialize "user" session ID from the request into a proper user object
app.use(passport.session());
// app.use(require('./routes'));
app.use('/api/', productRoutes);
app.use('/api/', imageRoutes);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);