const express=require("express");
const ejs=require("ejs");
const passport=require("passport");
var Strategy =require("passport-facebook").Strategy;

passport.use(new Strategy({

    clientID:"709592489466056",
    clientSecret:"bd93fe0e05519436ee0ee79fd52b11f3",
    callbackURL:"http://localhost:3000/login/facebook/return"

},
    function(accessToken,refreashToken,profile,cb){

        return cb(null,profile);
    }
)

);

passport.serializeUser((user,cb,)=>{

    cb(null,obj)
});

var app=express();

app.set("views",__dirname +"/views");

app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({extended:true}))
app.use(require("express-session")({secret :"loc app",resave:true,saveUninitialized:true}));


app.get("/",(req,res)=>{

    res.render("home",{user:req.user})
});

app.get("/login",(req,res)=>{
    res.render("login");

});

app.get("/login/facebook",passport.authenticate("facebook"));


app.get('/login/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});


app.get("/profile",require("connect-ensure-login").ensureLoggedIn(),(req,res)=>{
    res.render("profile",{user:req.user});

});

app.listen("3000",console.log("server is running....."));