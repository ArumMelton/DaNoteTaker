//requires
const express = require('express');
const path = require('path');

//express and port variables
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
app.use("/api", api);
app.use("/", html);

//listen on heroku or localhost3001
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });