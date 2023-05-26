const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const notesDb = require('./db/db.json');



const app = express();
const PORT = 3001;

// TODO: Invoke app.use() and serve static files from the '/public' folder
app.use(express.static('public'));

app.get('/', (req, res) => res.send(''));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// TODO: Create a route that will serve up the `public/paths.html` page
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'))
});



app.post('/api/notes', (req, res) => {
  const { title, text, id} = req.body

if (title && text && id) {
  const newNote = {
    title,
    text,
    id: crypto.randomUUID(),
  }
};
  notesDb.push(newNote);
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
      fs.writeToFile('./db/db.json', noteString, (err) => 
      err
        ? console.error(err)
        : console.log(`New Note Has Been Saved`)
      )
    
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);