//requires
const fs = require("fs");
const path = require("path");

//notes functions
//filters notes by query
function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
  }

//parses through data to find a note by id
function findById(id, notes) {
    const result = notes.filter(note => note.id === id)[0];
    return result;
  }

//creates a new note by pushing an entry to the data array and syncing the file
function createNewNote(body, notes) {
    let note = body;
    notes.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
      );

  return note;
  }

//validates if user data is entered correctly
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    return true;
  }

  //export
  module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
  };