const UserRepository = require("../repositories/UserRepositories/UserRepository");
const UserAvatarSessions = require("../services/UserAvatarSessions");

class UserAvatarController {
  async update(request, response){
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const userRepository = new UserRepository();
    const userAvatarSessions = new UserAvatarSessions(userRepository);

    const user = userAvatarSessions.execute({user_id, avatarFilename})

     return response.json(user);
  }
}

module.exports = UserAvatarController;