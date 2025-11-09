const express = require('express');
const router = express.Router();
const user = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const usersController = require('../controllers/users.js');

// Signup Form Combined
router.route('/signup')
    .get(usersController.renderSignup)
    .post(wrapAsync(usersController.signup));

// Login Form Combined
router.route('/login')
    .get(usersController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), wrapAsync(usersController.login));

// logout route
router.get('/logout', usersController.logout);


module.exports = router;