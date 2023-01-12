const { Router, request } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UserControllers = require('../controllers/UsersControllers');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);  
const userControllers = new UserControllers();
const userAvatarController = new UserAvatarController();


usersRoutes.post('/', userControllers.create)
usersRoutes.put('/', ensureAuthenticated, userControllers.update);
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)
module.exports = usersRoutes;