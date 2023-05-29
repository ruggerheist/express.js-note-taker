const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const notesDb = require('./db/db.json');



const app = express();
const PORT = 3001;

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => res.send(''));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// TODO: Create a route that will serve up the `public/paths.html` page
app.get('/api/notes', (req, res) => {
  res.json(notesDb);
});



app.post('/api/notes', (req, res) => {
  const { title, text } = req.body

if (title && text) {
  const newNote = {
    title,
    text,
    id: crypto.randomUUID(),
  };
  console.log(newNote);
  notesDb.push(newNote);
  res.json(newNote);
  console.log(notesDb);
  const noteString = JSON.stringify(notesDb);
  //  fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //       console.log(data);
  //     const parsedData = JSON.parse(data);
  //     console.log(req.body);
  //     parsedData.push(req.body());
  //     console.log(parsedData);
      fs.writeFile('./db/db.json', noteString, (err) => 
      err ? console.error(err) : console.log(`New Note Has Been Saved`)              
    )
    console.log(noteString);
  };    
});

app.delete(`/api/notes/:id`, (req, res) => {
 const { id } = req.params;
 const noteIndex = notesDb.findIndex(notes => notes.id == id);
 notesDb.splice(noteIndex, 1);
 const noteString = JSON.stringify(notesDb);  
  console.log('Note Deleted');
  fs.writeFile('./db/db.json', noteString, (err) => {
      err ? console.error(err) : console.log(`New Note Has Been Saved`)              
  res.send()
});
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);