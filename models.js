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

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Note = mongoose.model('Note', NoteSchema)
const User = mongoose.model('User', UserSchema)

module.exports = {
    Note, User
};