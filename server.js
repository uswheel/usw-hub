require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const routes = require('./routes');
const db = require('./db/models');

// express setup
const app = express();
const PORT = process.env.PORT || 3001;

// body parser configuration
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());

//routes
app.use(routes);

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// send react index.js
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> Server listening on PORT ${PORT}!`);
  });
});