const express = require('express');
const path = require('path');
const { readFromFile, readAndRemove, readAndAppend } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for all your notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received for all your notes`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`New Note Added! 🚀`);
    } else {
        res.error("Error! Couldn't add note")
    }
});

app.delete('/api/notes/:id', (req, res) => {
    console.info(`${req.method} request received for your selected note`)
    const { title, text, id } = req.body;

    const deleteNote = {
        title,
        text,
        id
    };
    readAndRemove(deleteNote.id, './db/db.json');
    res.json(`Note Deleted!`);
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);