const Note = require('../models/note');
const path = require('path');
const multer = require('multer');

// Set up multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name as the stored file name
    },
});

const upload = multer({ storage: storage });

exports.getDashboard = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            // Redirect or handle unauthorized access
            return res.redirect('/login');
        }

        const userFiles = await Note.find({ userId: req.user._id }); // Assuming user ID is stored in the 'userId' field
        res.render('index', { userFiles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.searchFiles = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            // Redirect or handle unauthorized access
            return res.redirect('/login');
        }

        const { search } = req.query;
        const searchResults = await Note.find({
            userId: req.user._id, // Assuming user ID is stored in the 'userId' field
            fileName: { $regex: new RegExp(search, 'i') },
        });
        res.render('index', { searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await Note.findById(fileId);

        // Handle file download logic here (e.g., using 'res.download' in Express)
        // ...

        // Example: Redirect to the dashboard after download
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Use multer middleware for single-file uploads
exports.uploadFile = upload.single('file');

exports.processUpload = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.isAuthenticated()) {
            // Redirect or handle unauthorized access
            return res.redirect('/login');
        }

        // Create a new Note document in the database
        const newNote = new Note({
            fileName: req.file.originalname,
            filePath: path.join(__dirname, '..', 'uploads', req.file.filename),
            userId: req.user._id,
        });

        // Save the Note document
        await newNote.save();

        res.redirect('/'); // Redirect to the dashboard after upload
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error uploading file' });
    }
};
