const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note;