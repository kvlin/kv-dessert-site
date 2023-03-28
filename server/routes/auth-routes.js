const express = require('express');
const router = express.Router();
const passport = require('../../config/passport')



// use .logout() to log out
router.get("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/"); // front end will take priority through href link
    });
});

// Login user
router.post('/login/', passport.authenticate('local'), (req, res) => {
    console.log(req.user)
    res.json(req.user)
})

// check if a user has been authenticated by verifying the isAuthenticated() property provided by passport.js
router.get('/logged-in', (req, res) => {
    try {
        res.json({ isAuthenticated: req.isAuthenticated(), user: req.user.email })
    } catch (err) {
        res.json({ isAuthenticated: false })
    }
})

module.exports = router