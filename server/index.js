require('dotenv').config();

const express = require('express'),
  massive = require('massive'),
  session = require('express-session'),
  socket = require('socket.io')
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

//////SOCKET/////
// const users = [{ user_id: 1, username: 'ted', role_id: 'admin' }, { user_id: 2, username: 'bob', role_id: 'admin' }]
// app.get('/api/messages/:id')
// const io = socket(
//   app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}.`))
// );

// io.on('connection', (socket) => {
//   socket.on('enter', ({ name }, cb) => {
//     console.log(name)
//     const error = true
//     if (error) {
//       cb({ error: 'error' })
//     }
//   })

//   socket.on('send message', message => {
//     socket.broadcast.emit('chat-message', message)
//   })

//   socket.on('disconnect', () => {


//   })
// })
//////SOCKET/////

// app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}.`));