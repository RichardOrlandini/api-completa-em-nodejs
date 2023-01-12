const { Router } = require("express");


const TagsControllers = require('../controllers/TagsControllers')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")


const tagsRoutes = Router();
const tagsControllers = new TagsControllers();


tagsRoutes.get('/',ensureAuthenticated,  tagsControllers.index)


module.exports = tagsRoutes;