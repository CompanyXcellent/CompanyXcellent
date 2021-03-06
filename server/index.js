require('dotenv').config({ path: __dirname + "/../.env" })
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
  EMAIL_PASSWORD,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT,
  RETURN_TO
} = process.env;

app.use( express.static( `${__dirname}/../build` ) );
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
      maxAge: 1000 * 60 * 60
    }
  })
);

//---------------company endPoints------------------
app.post('/api/poll', compCtrl.makePoll)
app.get('/api/employees', compCtrl.getAllEmployees);
app.get('/api/employees/:userId', compCtrl.getEmployee);
app.put('/api/employees/:userId', compCtrl.updateEmployeeInfo);

//------------user endpoints-------------------------
// Subscriptions
app.get('/api/profile/:id/subscriptions', userCtrl.getSubscriptions);
app.post('/api/profile/:id/subscriptions', userCtrl.subscribe);
app.delete('/api/profile/:id/subscriptions/:subscriptionId', userCtrl.unsubscribe);

// Posts
app.get('/api/posts/:id', userCtrl.getMySubscribedPosts);
app.post('/api/post', userCtrl.makePost);
app.delete('/api/deletePost/:id', userCtrl.deletePost);

// User Data
app.get('/api/profile/:id', userCtrl.getUserInfo);
app.put('/api/profile/:id', userCtrl.updateProfile);
app.get('/api/team/:id', userCtrl.getTeam);

// Polls
app.get('/api/poll', userCtrl.getPoll)
app.post('/api/pollResponseSubmition', userCtrl.submitPollResponse)
app.post('/api/employeeRatingsRetrieval', userCtrl.getEmployeeRating)

//Messages
app.get('/api/conversations/:id', socketCtrl.getConversations)

// --------S3---------
app.get("/api/signs3", userCtrl.storeProfilePic);

//?----- Sockets.io -------
const http = require('http');
const server = http.createServer(app);
// const socketCtrl = require('./controllers/socketCtrl')
const io = socket(server);

io.on('connection', (socket) => {
  socket.on('enter', async ({ userId, userTwo }) => {
    const db = app.get('db');

    let rooms = await db.get_rooms(userId);

    let otherParticipants = [];

    for(let i = 0; i < rooms.length; i++){
      let otherParticipant = await db.get_room(rooms[i].chat_room_id, userId);
      otherParticipants = [...otherParticipants, ...otherParticipant];
    }

    otherParticipants = otherParticipants.filter(e => e.user_id === +userTwo);

    if(otherParticipants[0]){
      const messages = await db.get_messages(otherParticipants[0].chat_room_id);
      socket.join(otherParticipants[0].chat_room_id);
      socket.emit('joined', { messages, room: otherParticipants[0] });
      return;
    }

    // Logic to create room if it doesn't exist.

    let chatRoomName = randomatic('Aa0!', 20);

    let newRoom = await db.create_room(chatRoomName);
    newRoom = newRoom[0];

    let participants = await db.add_participants(newRoom.chat_room_id, userId, userTwo);

    socket.join(newRoom.chat_room_name);
    socket.emit('joined', { messages: [], room: { chat_room_id: newRoom.chat_room_id, user_id: userId }});
  })

  socket.on('send message', async ({ message, room, userId }) => {
    const db = app.get('db');

    let newMessage = await db.send_message(userId, room.chat_room_id, message);
    newMessage = newMessage[0];

    // socket.emit('new message', newMessage);
    io.to(room.chat_room_id).emit('new message', newMessage);
  })
})

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
      let { id } = profile;

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

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get("/api/getUser", (req, res, next) => {
  if (req.session.passport !== undefined) {
    res.status(200).send(req.session.passport.user);
  } else res.sendStatus(500);
});

app.get(
  "/api/auth",
  passport.authenticate("auth0", {
    failureRedirect: FAILURE_REDIRECT
  }),
  (req, res) => {

    res.set('Location', SUCCESS_REDIRECT);
    res.status(302).send(req.session.passport.user);
    // res.redirect(SUCCESS_REDIRECT);
  }
);

app.get("/api/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  
  res.redirect(
    `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${RETURN_TO}&client_id=${CLIENT_ID}`
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

  if (user) {
    do {
      uniqueAuth0Id = randomatic('Aa0', 25)
      // uniqueAuth0Id = uniqueAuth0Id
      user = db.get_user_by_auth0_id(uniqueAuth0Id);
      user = user[0];
    } while (user);
  }

  user = await db.get_user_by_email(email);
  user = user[0];

  if (user) {
    return res.status(409).send('Email already in use.');
  }

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
    if (!err) {
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
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      let newUser = await db.create_user({ email, roleId, auth0Id: `auth0|${uniqueAuth0Id}` });
      newUser = newUser[0];

      let newUserInfo = await db.add_user_info({ userId: newUser.user_id, firstName, lastName, groupId, jobTitle });
      newUserInfo = newUserInfo[0];

      newUser = { ...newUser, ...newUserInfo }

      if (newUser.user_id) {
        res.status(200).send('User successfully created.');
      }
    }
  }))
})
//?---- End Auth0 -----

server.listen(SERVER_PORT, () => console.log(`Server has started on port ${SERVER_PORT}`));