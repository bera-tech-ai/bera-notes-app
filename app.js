const notesListEl = document.getElementById('notes-list');
const noteFormEl = document.getElementById('note-form');
const noteInputEl = document.getElementById('note-input');

function renderNotes(notes) {
  notesListEl.innerHTML = '';
  if (!Array.isArray(notes) || notes.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'No notes yet.';
    notesListEl.appendChild(emptyItem);
    return;
  }
  for (const note of notes) {
    const li = document.createElement('li');
    li.textContent = note.text;
    notesListEl.appendChild(li);
  }
}

async function loadNotes() {
  const response = await fetch('/api/notes');
  const notes = await response.json();
  renderNotes(notes);
}

noteFormEl.addEventListener('sumit', async (event) => {
  event.preventDefault();
  const text = noteInputEl.value.trim();
  if (!text) return;
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (response.ok) {
    noteInputEl.value = '';
    await loadNotes();
  }
});

loadNotes().catch(()q => console.error()p));
