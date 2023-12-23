// auth.js

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const isAuthenticated = require('../routes/authMiddleware.js'); // Adjust the path for the isAuthenticated middleware
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({ error: 'User with the same username already exists' });
    }

    // If the user does not exist, proceed with registration
    const newUser = new User({
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      college: req.body.college
    });

    await User.register(newUser, req.body.password);

    // Handle authentication or redirection as needed

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering user' });
  }
});


// Assuming you have required necessary modules and configured Passport

// Assuming you have required necessary modules and configured Passport

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication Failed' });
    }

    // If you reach here, authentication is successful, and `user` contains user information
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.redirect('index'); 
    });
  })(req, res, next);
});




router.get('/index', (req, res) => {
  res.render('index');  // Assuming 'index.ejs' is in your 'views' directory
});

router.get('/login', (req, res) => {
  res.render('login');  // Assuming you have a login view (login.ejs)
});

router.get('/notes', (req, res) => {
  res.render('notes');  // Assuming you have a login view (login.ejs)
});

router.get('/upload', (req, res) => {
  res.render('upload');  // Assuming you have a login view (login.ejs)
});


router.get('/signup', (req, res) => {
  res.render('signup');  // Assuming you have a login view (login.ejs)
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ success: true });
});

// Example of a protected route
router.get('/profile', isAuthenticated, (req, res) => {
  // This route is protected, only accessible by authenticated users
  res.json({ user: req.user });
});

module.exports = router;
