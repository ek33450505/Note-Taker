const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// request data from db.json
const { notes } = require('./db/db.json');

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

// GET * should return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// POST /api/notes should recieve a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client
    // give each note a unique id when its saved - find npm packages

// BONUS 
// DELETE /api/notes/:id should recieve a query parmeter containing the id of a note to delete
    // In order to to delete youll need to read all notes from the db.json file
        // remove the note with the given id
        // rewrite the notes to the db.json file

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);