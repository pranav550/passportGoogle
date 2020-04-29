const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes")
const profileRoutes = require("./routes/profileRoutes")
const passportSetup = require('./config/passport-setup');
const connectDB = require('./config/db');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
const passport = require("passport");

// coonection
mongoose.connect(keys.mongodb.dbURI,{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>console.log('mongoose connect'))
.catch((err)=>console.log(err))


const app = express()

app.use(cookieSession({
    maxAge:30*60*60*1000,
    keys:[keys.session.cookieKey]
}))

// initilize passport

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res)=>{
    res.send("home")
})

app.listen(3000, ()=>{
    console.log(`server Started`)
})