require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

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
      console.log(profile)
      app
        .get("db")
        .get_user([profile.id])
        .then(res => {
          if (!res[0]) {
            let { id } = profile
            let { value } = profile.emails[0]
            console.log( id, value)
            app
              .get("db")
              .create_user([id, value])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
            return done(null, created[0]);
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
    res.redirect("http://localhost:3000/#/");
  }
)
app.get('/api/logout', (req, res) => {
  console.log('logout')
  req.logout();
  let returnTo = 'http://localhost:3000/'
  res.redirect(
    `https://${AUTH0_DOMAIN}/v2/logout?returnTo=${returnTo}&client_id=${CLIENT_ID}`
  )
})
app.post('/api/post', (req, res, next) => {
  returnStr = req.body.place;
  res.status(200).send(returnStr)
})
//?---- End Auth0 ------

app.listen(SERVER_PORT, () => {
  console.log(`server on port ${SERVER_PORT}`);
});
