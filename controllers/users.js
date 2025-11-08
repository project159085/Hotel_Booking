const user = require('../models/user');

module.exports.renderSignup = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Hotel Booking!');
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect(res.locals.redirectUrl || '/listings');
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have logged out successfully!');
        res.redirect('/listings');
    });
};