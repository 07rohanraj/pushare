const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const multer = require('multer');
const isAuthenticated = require('./routes/auth');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pushare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

// Set up middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Passport configuration
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/notes', isAuthenticated, notesRoutes);

app.post('/upload', isAuthenticated, upload.single('file'), notesController.uploadFile);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
