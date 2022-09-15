
const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoute');

router.use(notesRoutes);

module.exports = router;