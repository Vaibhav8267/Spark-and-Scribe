const express = require("express");
const app = express();
const path = require("path");
const post = require("./model/post");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const flash = require("connect-flash");

//Passport setting up
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./model/user.js");

//session option
const sessionOptions = {
  secret: "Mysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 100,
    maxAge: 7 * 24 * 60 * 60 * 100,
    httpOnly: true,
  },
}

const port = 2614;

//Home page

//Session Middlewares
app.use(session(sessionOptions));
app.use(flash());
//Flash Messages 
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//passport
app.use(passport.initialize());
app.use(passport.session());//require to know that wheater the same user is sending req to another page of diff user  
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); //store user data into session
passport.deserializeUser(user.deserializeUser());
//Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const Mongo_URL = "mongodb://127.0.0.1:27017/sparkandscribe";

async function main() {
  await mongoose.connect(Mongo_URL);
}


// --- START: Added Database Connection ---
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });





//gohome 
app.get("/gohome", async (req, res) => {
  const allPost = await post.find({});
  // console.log(allPost);
  res.render("home.ejs", { allPost });
});

app.get("/about", (req, res) => {

  res.render("about.ejs");
});
//Signup
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new user({ email, username });
    const regUser = await user.register(newUser, password);
    console.log(regUser);
    req.flash("success", "Registred Successfull")
    res.redirect("/login")
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup")
  }
  // req.flash("error","Login Successfull")
  // res.send(newUser);
});

//login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
  res.redirect("/gohome");

});

app.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","Logged Out");
        res.redirect("/login");
    })
})

//Creating Port request
app.listen(port, () => {
  console.log(`Server is listening to port : ${port}`);
});