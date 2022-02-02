const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.resolve(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const newNote = {
    title,
    id: Date.now().toString()
  };
  notes.push(newNote);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.cyanBright("Note was added!"));
}

async function removeNote(noteId) {
  const notes = await getNotes();
  const updateNotes = [...notes].filter(note => note.id !== noteId);
  await fs.writeFile(notesPath, JSON.stringify(updateNotes));
  console.log(chalk.redBright(`Notes with id: ${noteId} was deleted`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.blue.underline.bold("Notes list:"));
  for (const note of notes) {
    console.log(chalk.magenta(note.id), chalk.cyanBright(note.title));
  }
}

async function editNote(title, noteId) {
  const notes = await getNotes();
  const editNoteIndex = notes.findIndex(note => note.id === noteId);
  notes[editNoteIndex] = { ...notes[editNoteIndex], title };
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.magenta(`Notes with id: ${noteId} was editted`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote
};
