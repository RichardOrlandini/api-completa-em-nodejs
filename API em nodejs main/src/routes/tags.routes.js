const { Router } = require("express");
const tagsRoutes = Router();

const TagsControllers = require('../controllers/TagsControllers')
const tagsControllers = new TagsControllers();


tagsRoutes.get('/:user_id', tagsControllers.index)


module.exports = tagsRoutes;