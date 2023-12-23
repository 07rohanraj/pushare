// routes/notes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const isAuthenticated = require('../routes/auth');

// Require the Note model
const Note = require('../models/note');

router.get('/upload', isAuthenticated, notesController.getUploadForm);
router.post('/upload', notesController.uploadFile);
router.get('/download/:id', isAuthenticated, notesController.downloadFile);

module.exports = router;
