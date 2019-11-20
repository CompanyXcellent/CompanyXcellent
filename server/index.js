require('dotenv').config();

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      app = express(),
      {
        SERVER_PORT, 
        SESSION_SECRET, 
        CONNECTION_STRING
      } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
    .then(db => {
      app.set('db', db);
      console.log('DB Connected.');
    })
    .catch(err => console.log(err));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}.`));