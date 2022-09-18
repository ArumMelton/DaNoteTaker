const express = require("express");
const fs = require("fs");
const app = express();
var noteData = require("./db/db.json");
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const { json } = require("express");
const { fstat } = require("fs");

const PORT = process.env.PORT || 3001;

// function to find notes by id//
function findNotesID(id, noteData) {
  const result = noteData.filter((note) => note.id === id)[0];
  return result;
}

// Random ID function//
var randomID = function () {
  return Math.floor(Math.random() * 9999 * 7)
    .toString(10)
    .substring(1);
};

// API routes
app.get("/api/notes", function (req, res) {
  console.log(noteData);
  res.json(noteData);
});

app.post("/api/notes", function (req, res) {
  let jsonData = req.body;
  jsonData["id"] = randomID();
  noteData.push(jsonData);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
  res.json(true);
});

//delete api route function??
app.delete("/api/notes/:id", function (req, res) {
  const result = findNotesID(req.params.id, noteData);
  if (result) {
    var oldNotesList = noteData;
    let newNotesList = oldNotesList.filter((note) => note.id !== req.params.id);
    console.log(newNotesList);

    fs.writeFileSync("./db/db.json", JSON.stringify(newNotesList));
    noteData = newNotesList;
    res.json(newNotesList);
  }
});

// HTML routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// APP Listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});