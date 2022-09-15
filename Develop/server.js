//requires
const express = require('express');
const path = require('path');

//express and port variables
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//listen on heroku or localhost3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });