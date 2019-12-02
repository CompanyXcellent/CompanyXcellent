require('dotenv').config({path: __dirname + "/../.env"})
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const auth0 = require("auth0");
const nodemailer = require("nodemailer");

const socket = require('socket.io')

const randomatic = require('randomatic');

const userCtrl = require("./controllers/userController");
const compCtrl = require("./controllers/compController");
const socketCtrl = require("./controllers/socketCtrl");

const app = express();
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  AUTH0_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CLIENT_ID_TWO,
  CLIENT_SECRET_TWO,
  EMAIL_PASSWORD
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log('db connected');
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//---------------company endPoints------------------
app.post('/api/makePoll', compCtrl.makePoll)
app.get('/api/employees', compCtrl.getAllEmployees);
app.get('/api/employees/:userId', compCtrl.getEmployee);
app.put('/api/employees/:userId', compCtrl.updateEmployeeInfo);

//------------user endpoints-------------------------
// Subscriptions
app.get('/api/getMySubscribedPosts/:id', userCtrl.getMySubscribedPosts);
app.get('/api/profile/:id/subscriptions', userCtrl.getSubscriptions);
app.post('/api/profile/:id/subscriptions', userCtrl.subscribe);
app.delete('/api/profile/:id/subscriptions/:subscriptionId', userCtrl.unsubscribe);

// Posts
app.post('/api/makePost', userCtrl.makePost);
app.delete('/api/deletePost/:id', userCtrl.deletePost);

// User Data
app.get('/api/profile/:id', userCtrl.getUserInfo);
app.put('/api/profile/:id', userCtrl.updateProfile);
app.get('/api/getTeam/:id', userCtrl.getTeam)

// Polls
app.get('/api/getPoll', userCtrl.getPoll)
app.post('/api/submitPollResponse', userCtrl.submitPollResponse)
app.get('/api/getEmployeeRatings', userCtrl.getEmployeeRating)

//Messages
app.get('/api/conversations/:id', socketCtrl.getConversations)

// --------S3---------
app.get("/api/signs3", userCtrl.storeProfilePic);

//?----- Sockets.io -------
// const http = require('http');
// const server = http.createServer(app);
// const socketCtrl = require('./controllers/socketCtrl')
// const io = socket(server);

// io.on('connection', (socket) => {
//   console.log('Socket Connection');
//   // socket.on('join', async ({ nickname, user_info_id, group_id }) => {

//   //   // socket.broadcast.emit('message', { text: `${nickname} has joined` })
//   //   // console.log(nickname)

//   // })

//   // socket.on('send message', message => {
//   //   socket.broadcast.emit('chat-message', message)
//   //   console.log(message)
//   // })

//   socket.on('join', async ({chat_room_id, chat_room_name, user_id}, callback) => {
//     console.log(chat_room_id, chat_room_name, user_id);

//     const room = await chatCtrl.getChatRoom(app, chat_room_id);

//     if(room){
//       socket.join(room.chat_room_name);
//       return;
//     }

//     const newRoom = await chatCtrl.createRoom(app, user_id, otherUser);

//     socket.join(newRoom.chat_room_name);
//   })

//   socket.on('sendMessage', ({ userId, message }, callback) => {
//     // sendMessage function that creates the message in the database with the appropriate user id, room id, content, and time stamp. It should return the new message, pass it into the callback function which will append it to the messages array displaying on the front end.

//     io.to(roomId).emit('newMessage', { stuff });

//     callback();
//   });

const http = require("http");
const server = http.createServer(app);
const io = socket(server);

app.get("/api/getRoomName/:socket_room_id");

io.on("connection", socket => {
  console.log("CONNECTED TO SOCKET");
  socket.on("enter room", async data => {
    let { selectedRoom, roomName } = data;
    const db = app.get("db");
    console.log("Now Joined to ", selectedRoom);
    const [existingRoom] = await db.get_rooms(selectedRoom); //build this sql
    if (!existingRoom) await db.create_room(roomName, selectedRoom); //build this sql
    let messages = await db.get_messages(selectedRoom); //build this sql
    socket.join(selectedRoom);
    io.in(selectedRoom).emit("room entered", messages);
  });
  //?send messages
  socket.on("send message", async data => {
    const { selectedRoom, message, sender } = data;
    const db = app.get("db");
    await db.send_message(+selectedRoom, message, +sender); //!build this sql
    let messages = await db.get_messages(selectedRoom); //build this sql
    if (messages.length <= 1)
      io.to(selectedRoom).emit("room entered", messages);
    io.to(data.selectedRoom).emit("message sent", messages);
  });
  //disconnected
  socket.on('disconnect', () => {
    console.log('Disconnected from room')
  })
});

//?----- Auth0 ------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: AUTH0_DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/api/auth"
    },

    function (accessToken, refreshToken, extraParams, profile, done) {
      // const db = req.app.get('db');
      let { id } = profile;
      // let { value } = profile.emails[0];

      app.get('db').get_user([id])
        .then(response => {
          if (!response[0]) {
            console.log('User does not exist');
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get("/api/getUser", (req, res, next) => {
  if (req.session.passport.user) {
    res.status(200).send(req.session.passport.user);
  } else res.sendStatus(500);
});

app.get(
  "/api/auth",
  passport.authenticate("auth0", {
    failureRedirect: "http://localhost:3000/#/"
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/#/posts");
  }
);

app.get("/api/logout", (req, res) => {
  console.log("logout");
  req.logout();
  let returnTo = "http://localhost:3000/";
  res.redirect(
    `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${returnTo}&client_id=${CLIENT_ID}`
  );
});

app.post("/api/post", (req, res, next) => {
  returnStr = req.body.place;
  res.status(200).send(returnStr);
});

const ManagementClient = auth0.ManagementClient;
const auth0ManagementClient = new ManagementClient({
  domain: `${AUTH0_DOMAIN}`,
  clientId: CLIENT_ID_TWO,
  clientSecret: CLIENT_SECRET_TWO,
  scope: "read:users update:users"
});

app.post('/api/register', async (req, res) => {
  const db = req.app.get('db');
  const {
    email,
    roleId,
    auth0Id, 
    firstName,
    lastName,
    groupId,
    jobTitle,
    password } = req.body;

  let user = await db.get_user_by_auth0_id(auth0Id);
  user = user[0];

  let uniqueAuth0Id = auth0Id;

  if(user){
    do {
      uniqueAuth0Id = randomatic('Aa0', 25)
      // uniqueAuth0Id = uniqueAuth0Id
      user = db.get_user_by_auth0_id(uniqueAuth0Id);
      user = user[0];
    } while (user);
  }

  user = await db.get_user_by_email(email);
  user = user[0];

  if(user){
    return res.status(409).send('Email already in use.');
  }

  console.log('auth0 activating')
  auth0ManagementClient.createUser({
    user_id: uniqueAuth0Id,
    email: email,
    password: password,
    given_name: firstName,
    family_name: lastName,
    name: `${firstName} ${lastName}`,
    connection: 'Username-Password-Authentication'
  }, (async err => {
    console.log(err);
    if(!err){
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'companyxcellent@gmail.com',
               pass: EMAIL_PASSWORD
           }
       });
    
       const mailOptions = {
        from: 'companyxcellent@gmail.com', // sender address
        to: `${email}`, // list of receivers
        subject: 'Login Credentials', // Subject line
        text: `Hello ${firstName},\n\nThe following are your login credentials for the CompanyXcellent Software that your company uses.\n\nEmail: ${email}\nPassword: ${password}\n\nSincerly,\nThe CompanyXcellent Team`// plain text body
      };
    
      transporter.sendMail(mailOptions, (err, info) => {
        if(err){
          console.log(err);
        } else {
          console.log(info);
        }
     });

      let newUser = await db.create_user({email, roleId, auth0Id: `auth0|${uniqueAuth0Id}`});
      newUser = newUser[0];

      let newUserInfo = await db.add_user_info({userId: newUser.user_id, firstName, lastName, groupId, jobTitle});
      newUserInfo = newUserInfo[0];

      newUser = {...newUser, ...newUserInfo}

      if(newUser.user_id){
        res.status(200).send('User successfully created.');
      }
    }
  }))
})
//?---- End Auth0 -----

server.listen(SERVER_PORT, () => console.log(`Server has started on port ${SERVER_PORT}`));