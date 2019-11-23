require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const socket = require('socket.io')


const app = express();
const {
  SERVER_PORT,
  SESSION_SECRET,
  CONNECTION_STRING,
  AUTH0_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db connected");
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

//?----- Sockets.io -------
const socketCtrl = require('./controllers/socketCtrl')
const io = socket(
  app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}.`))
);

io.on('connection', (socket) => {
  console.log('Socket Connection')
  socket.on('enter', async ({ nickname, user_info_id, group_id }) => {

    socket.broadcast.emit('message', { text: `${nickname} has joined` })
    console.log(nickname)

  })

  // socket.on('send message', message => {
  //   socket.broadcast.emit('chat-message', message)
  //   console.log(message)
  // })

  socket.on('disconnect', () => {


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
      let { value } = profile.emails[0];
      console.log(id)
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

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
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
//?---- End Auth0 ------
