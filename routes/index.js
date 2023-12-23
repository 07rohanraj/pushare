// index.js

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getDashboard);
router.get('/search', indexController.searchFiles);
router.get('/download/:id', indexController.downloadFile);
router.post('/upload', indexController.uploadFile);

module.exports = router;
