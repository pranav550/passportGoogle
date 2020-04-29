const router = require('express').Router();

const authCheck = (req, res, next)=>{
    if(!req.user){
        // if not logged in
        res.redirect('/auth/login')
    }
    else{
        // if logged in 
        next()

    }
}

router.get('/', (req, res)=>{
    res.send('You logged in this is your profile-'+req.user.username)
})


module.exports = router