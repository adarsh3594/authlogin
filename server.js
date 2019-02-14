const express = require("express");
const app = express();
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

dotenv.config();
let port = process.env.PORT || 8080;
let strategy = new Auth0Strategy(
   {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/callback"
   },
   function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
   }
);

passport.use(strategy);

passport.serializeUser((user, done) => {
   done(null, user);
});

passport.deserializeUser((user, done) => {
   done(null, user);
});

var sess = {
   secret: "CHANGE THIS TO A RANDOM SECRET",
   cookie: {},
   resave: false,
   saveUninitialized: true
};

app.use(session(sess));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

// app.use("/api", router);

app.get("/", (req, res) => {
   res.render("index");
});

app.get(
   "/login",
   passport.authenticate("auth0", {
      scope: "openid email profile"
   }),
   (req, res) => {
      res.redirect("/user");
   }
);

app.get('/callback', function(req,res){
	if(!req.user){
		throw new Error('user null');
	}
	res.redirect("/user")
});

app.get(
   "/user",
   (req, res, next) => {
      if (req.user) next();
      res.redirect("/login");
   },
   (req, res) => {
      res.render("user");
   }
);

app.use((req, res) => {
   res.status(404).json({ msg: "Not Found" });
});

app.listen(port, () => {
   console.log("Server started at ", port);
});
