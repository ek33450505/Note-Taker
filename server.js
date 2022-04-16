const express = require('express');
const app = express(); 
const fs = require('fs');

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET /notes should return the notes.html file

// GET * should return the index.html file

// GET /api/notes should read the db.json file and return all saved notes as JSON

// POST /api/notes should recieve a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client
    // give each note a unique id when its saved - find npm packages

// BONUS 
// DELETE /api/notes/:id should recieve a query parmeter containing the id of a note to delete
    // In order to to delete youll need to read all notes from the db.json file
        // remove the note with the given id
        // rewrite the notes to the db.json file