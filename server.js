const express = require('express');
const path = require('path');
const fs = require('fs');

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
   fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
        console.log(data);
      const parsedData = JSON.parse(data);
      req.body.id = parsedData.length + 1
      console.log(req.body);
      parsedData.push(req.body);
      console.log(parsedData);
     // writeToFile(file, parsedData);
    }
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);