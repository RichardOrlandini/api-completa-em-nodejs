const { Router } = require("express");
const notesRoutes = Router();

const NotesControllers = require('../controllers/NotesControllers')
const notesControllers = new NotesControllers();


notesRoutes.post('/:user_id', notesControllers.create)
notesRoutes.get('/', notesControllers.index)
notesRoutes.get('/:id', notesControllers.show)
notesRoutes.delete('/:id', notesControllers.delete)

module.exports = notesRoutes;