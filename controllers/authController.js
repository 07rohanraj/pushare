// authController.js

const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');
const passport = require('passport'); // If using Passport.js for authentication

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.postSignup = async (req, res) => {
    const { username, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
    });

    await newUser.save();

    // Redirect to login page after successful signup
    res.redirect('/login');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/', // Redirect to home page upon successful login
    failureRedirect: '/login', // Redirect back to login page upon failed login
    failureFlash: true,
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
