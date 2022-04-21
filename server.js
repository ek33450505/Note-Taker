const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//middleware for public files
app.use(express.static('public'));

// request data from db.json
const { notes } = require('./db/db.json');

// function for handling data from the req.body user input and adding it to db.json
function createNewNote (body, notesArray) {
    notesArray.push(body); 

    // Write user input into the notes array 
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ body : notesArray }, null, 2)
    );

    //return finished code to post route for response
    return body;
};

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
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(notes);
});

// POST /api/notes should recieve a new note to save on the request body
    // add it to the db.json file
    // return the new note to the client
    // give each note a unique id when its saved - find npm packages

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  res.json(req.body);
});

// BONUS 
// DELETE /api/notes/:id should recieve a query parmeter containing the id of a note to delete
    // In order to to delete youll need to read all notes from the db.json file
        // remove the note with the given id
        // rewrite the notes to the db.json file

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);