const { Router } = require("express");
const UserControllers = require('../controllers/UsersControllers');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();

const userControllers = new UserControllers();


usersRoutes.post('/', userControllers.create)
usersRoutes.put('/', ensureAuthenticated, userControllers.update);

module.exports = usersRoutes;