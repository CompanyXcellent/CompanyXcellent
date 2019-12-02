require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const auth0 = require("auth0");
const nodemailer = require("nodemailer");

const socket = require("socket.io");

const userCtrl = require("./controllers/userController");
const compCtrl = require("./controllers/compController");

const app = express();
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  AUTH0_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CLIENT_ID_TWO,
  CLIENT_SECRET_TWO
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  const io = socket(
    app.listen(SERVER_PORT, () => {
      console.log(`server listening on ${SERVER_PORT}`);
      console.log("db connected");
    })
  );
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
app.get("/api/allEmployees", compCtrl.getAllEmployees);

//------------user endpoints-------------------------
app.get("/api/getMySubscribedPosts/:id", userCtrl.getMySubscribedPosts);

// --------S3---------
app.get("/api/signs3", userCtrl.storeProfilePic);

//?----- Sockets.io -------
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
    function(accessToken, refreshToken, extraParams, profile, done) {
      let { id } = profile;
      let { value } = profile.emails[0];
      console.log(id);
      app
        .get("db")
        .get_user([id])
        .then(response => {
          if (!response[0]) {
            // console.log( res )
            //!Change to make it add to the user_info table
            app
              .get("db")
              .create_user([id, value])
              .then(created => {
                // console.log(created)
                return done(null, created[0]);
              });
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
    console.log("hit end");
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

app.post("/api/register", (req, res) => {
  const db = req.app.get("db");
  const { userId, firstName, lastName, email, password } = req.body;
  // console.log(req.body)
  // console.log(req.body.user_id)
  auth0ManagementClient.getUsersByEmail(email, (err, users) => {
    // console.log(users.length)
    if (users !== undefined && users.length >= 1) {
      return res.status(409).send("Email already in use.");
    } else {
      auth0ManagementClient.getUser({ id: `auth0|${userId}` }, (err, user) => {
        if (err) {
          console.log(err);
          return;
        }

        if (user) {
          return res.status(409).send("User Id already in use.");
        }

        auth0ManagementClient.createUser(
          {
            user_id: userId,
            password: password,
            given_name: firstName,
            family_name: lastName,
            name: `${firstName} ${lastName}`
          },
          err => {
            if (!err) {
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "companyxcellent@gmail.com",
                  pass: "da2340kkj"
                }
              });

              const mailOptions = {
                from: "companyxcellent@gmail.com", // sender address
                to: "john.redd702@gmail.com", // list of receivers
                subject: "Subject of your email", // Subject line
                text: "Hi" // plain text body
              };

              transporter.sendMail(mailOptions, function(err, info) {
                if (err) console.log(err);
                else console.log(info);
              });

              // db.

              auth0.getUser({ id: `auth0|${userId}` }, (err, user) => {
                if (err) {
                  return res.send(err);
                }

                res.status(200).send(user);
              });
            }
          }
        );
      });
    }
  });
});
//?---- End Auth0 ------
