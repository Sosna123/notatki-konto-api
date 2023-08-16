// express
const express = require('express')

// mongoose
const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://olekarez:test123@notatki-konto.tvmbsxd.mongodb.net/?retryWrites=true&w=majority'

// schemas
const Note = require('./models.js')

// morgan
const morgan = require('morgan')

// cors
const cors = require('cors')
const corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:3000']
}

// app
const app = express();


mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    app.listen(3000);
    console.log('connected')
})
.catch((err) => {console.log(err)});

app.use(morgan('dev'));


// wysyłanie danych

app.get("/", cors(corsOptions), (req, res) => {
    Note.find().then((data) => res.json(data));
});

app.get("/:id", cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Note.findById(id).then((data) => res.json(data));
});

app.post('/', cors(corsOptions), (req, res) => {
    console.log(req.body)
    const newNote = new Note(req.body)
    newNote.save().then(() => {
        res.redirect('/')
    })
})

app.delete('/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Note.findByIdAndDelete(id).then(() => {
        res.redirect('/')
    })
})