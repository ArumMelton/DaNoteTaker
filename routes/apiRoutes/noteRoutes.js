//requires
var notes = require('../../db/db.json');
const fs = require('fs');
const {  filterByQuery,
    findById,
    createNewNote,
    validateNote } = require('../../lib/notes');
const router = require('express').Router();
const path = require("path");
// Helper method for generating unique ids
const uuid = require('../../helpers/uuid');

router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result){
     res.json(result);   
    } else{
        res.send(404);
    }
  });

router.delete("/notes/:id", async (req, res) => {
    const deletedNote = findById(req.params.id, notes);
    if (deletedNote) {
      let originalList = JSON.parse(fs.readFileSync("../../db/db.json", "utf8"));
      const filteredNote = await originalList.filter(
        (note) => note.id !== req.params.id
      );
  
      fs.writeFileSync("../../db/db.json", JSON.stringify(filteredNote));
      const newList = JSON.parse(fs.readFileSync("../../db/db.json", "utf8"));
  
      return res.json(newList);
    }
  });

router.post('/notes', (req, res) => {
    req.body.id = uuid();
    if (!validateNote(req.body)) {
        res.status(400).send('This note is not properly formatted.');
      } else {
        const newNote = createNewNote(req.body, notes);
        res.json(newNote);
      }
});

//export
module.exports = router;