// express
const express = require('express')

// bodyParser
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

// mongoose
const mongoose = require('mongoose')
const dbURI = 'mongodb+srv://olekarez:test123@notatki-konto.tvmbsxd.mongodb.net/?retryWrites=true&w=majority'

// schemas
const { Note, User } = require('./models.js')

// morgan
const morgan = require('morgan')

// cors
const cors = require('cors')
const corsOptions = {
    origin: '*'
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
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors(corsOptions));


// wysyłanie danych

    // home
app.get("/", (req, res) => {
    Note.find().then((data) => res.json(data));
});


app.post('/', (req, res) => {
    console.log(req.body)
    const newNote = new Note(req.body)
    newNote.save().then(() => {
        res.redirect('/')
    })
})

    // id pages
app.get("/:id", (req, res) => {
    const { id } = req.params;
    Note.findById(id).then((data) => res.json(data));
});

app.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const result = await Note.findByIdAndUpdate(id, {content: body.content, isComplete: body.isComplete})
})

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    try{
        Note.findByIdAndDelete(id).then(() => {
            res.status(200)
        })
    } catch(err){
        console.log(`there is no note with id: ${id}`)
    }
    
})