const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class UserAvatarSessions {
    constructor(userRepository){ //executa no momento da instância
        this.userRepository = userRepository;
    }

    async execute({user_id, avatarFilename}){
        const diskStorage = new DiskStorage();
        
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
          }

        if (user[0].avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        
        const newAvatar = filename;

        const update = await this.userRepository.update(user_id, newAvatar);

        return {avatar: update};

    }
}

module.exports = UserAvatarSessions;