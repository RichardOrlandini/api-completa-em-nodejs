const { Router } = require("express");
const usersRoutes = Router();
const UserControllers = require('../controllers/UsersControllers');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userControllers = new UserControllers();


usersRoutes.post('/', userControllers.create)
usersRoutes.put('/', ensureAuthenticated, userControllers.update)

module.exports = usersRoutes;