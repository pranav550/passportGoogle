const router = require("express").Router()
const passport = require("passport")

// auth login
router.get('/login', (req, res)=>{
    res.send("login")
})

// auth with google
router.get('/google',passport.authenticate('google', { scope: ['profile'] }))

// auth logout
router.get('/logout',(req, res)=>{
    req.logOut();
    res.redirect('/');
})

// callback route for google
router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    //res.send(req.user)
    res.redirect('/profile/')
})

module.exports = router