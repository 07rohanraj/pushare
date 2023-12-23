// models/user.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  college: String
});

// Configure passport-local-mongoose to use 'username' as the username field
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', userSchema);
