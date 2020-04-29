const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./key');
const User = require('../models/userModel');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id).then((user)=>{
        done(null, user);
    }) 
    });


passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret:  keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },(accessToken, refreshToken, profile, done)=>{
      console.log('passport callback function fired')
      console.log(profile)
      // check user exist in db
      User.findOne({ googleId: profile.id }).then((currentUser)=>{
          if(currentUser){
          //already have the user
          console.log('user is:', currentUser)
          done(null, currentUser);
          }
          else{
            new User({
                username: profile.displayName,
                googleId:profile.id,
                thumbnail:profile._json.picture
            }).save().then((data)=>{
               console.log('new User Created'+ data)
               done(null, data)
               
            })
          }
      })
    }

));
