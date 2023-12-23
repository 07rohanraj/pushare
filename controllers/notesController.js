// controllers/notesController.js
const Note = require('../models/note');

exports.getUploadForm = (req, res) => {
  res.render('upload');
};

exports.uploadFile = async (req, res) => {
  try {
    const { originalname, filename } = req.file;

    const newNote = new Note({
      fileName: originalname,
      filePath: `uploads/${filename}`,
      userId: req.user._id,
    });

    await newNote.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading file' });
  }
};

exports.downloadFile = async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await Note.findById(fileId);
    const filePath = file.filePath;

    res.download(filePath, file.fileName);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
