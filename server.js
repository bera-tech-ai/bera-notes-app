const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

let notes = [
  { id: 1, text: 'Welcome to bera-notes-app!' }
];
let nextId = 2;

app.get('/api/notes', (req, res) => {
  res.json(notes);
});
app.post('/api/notes', (req, res) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!text) {
    return res.status(400).json({ error: 'Note text is required' });
  }
  const note = { id: nextId++, text };
  notes.push(note);
  res.status(201).json(note);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`bera-notes-app listening on port ${PORT}`);
});
