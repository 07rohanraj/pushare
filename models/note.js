// models/note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
