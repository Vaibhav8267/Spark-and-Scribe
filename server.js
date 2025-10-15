const express=require("express");
const app=express();
const path = require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const port=2614;

//Home page
//Middlewares
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
//Home Route
app.get("/home", (req, res) => {
    res.render("home.ejs");
});

//login Route
app.get("/login", (req, res) => {
    res.render("login.ejs");
});


//Post Rotuer of login
app.post("/login/home",(req,res)=>{
    res.render("home");
});
//Post Router of Signin
app.post("/register",(req,res)=>{
    res.render("home")
})

//gohome 
app.get("/gohome",(req,res)=>{
    res.render("home.ejs");
});

//signup Route
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});
app.get("/about", (req, res) => {
   
    res.render("about.ejs"); 
});
//Creating Port request
app.listen(port,()=>{
console.log(`Server is listening to port : ${port}`);
});