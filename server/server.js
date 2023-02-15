const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const productRoutes = require('./routes/product-routes');
const imageRoutes = require('./routes/image-routes');
// express middleware, used to be bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// app.use(require('./routes'));
app.use('/api/', productRoutes);
app.use('/api/', imageRoutes);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);