const { Router } = require("express");


const NotesControllers = require('../controllers/NotesControllers')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router();
const notesControllers = new NotesControllers();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post('/', notesControllers.create)
notesRoutes.get('/', notesControllers.index)
notesRoutes.get('/:id', notesControllers.show)
notesRoutes.delete('/:id', notesControllers.delete)

module.exports = notesRoutes;