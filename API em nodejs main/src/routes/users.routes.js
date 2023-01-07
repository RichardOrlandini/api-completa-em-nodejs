const { Router } = require("express");
const usersRoutes = Router();
const UserControllers = require('../controllers/UsersControllers')
const userControllers = new UserControllers();


usersRoutes.post('/', userControllers.create)
usersRoutes.put('/:id', userControllers.update)

module.exports = usersRoutes;