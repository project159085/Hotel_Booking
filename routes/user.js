const express = require('express');
const router = express.Router();
const user = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const usersController = require('../controllers/users.js');

// signup form
router.get('/signup', usersController.renderSignup);

router.post('/signup', wrapAsync(usersController.signup));

// login form
router.get('/login', usersController.renderLogin);

router.post('/login', saveRedirectUrl, passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login'
}), wrapAsync(usersController.login));

// logout route
router.get('/logout', usersController.logout);


module.exports = router;