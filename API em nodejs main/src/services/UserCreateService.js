const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");


class UserCreateService {

    constructor(userRepository){ //executa no momento da instância
        this.userRepository = userRepository;
    }

    async execute({name, email, password}){
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) { 
            throw new AppError("Este email já  está em uso!")
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }

    async executeUpdate({name, email, password, new_password, user_id}){
      
      const user = await this.userRepository.findById(user_id);
      if (!user) { 
          throw new AppError("usuario não encontrado!")
      }

      if (email){
        const userWithEmailExist = await this.userRepository.findByEmail(email);

        if (userWithEmailExist && userWithEmailExist.id !== user_id) { 
          throw new AppError("Este email já  está em uso!")
        }
      }

      user.name = name ?? user.name ;
      user.email = email ?? user.email;
      
      if (!new_password || !password){
        throw new AppError("Você precisa informar as senhas")
      }

      if (new_password && password){
        const checkOldPassword = await compare(password, user[0].password);

          if (!checkOldPassword){
            throw new AppError("A senha antiga não confere");
          }

          user.password = await hash(new_password, 8);
      }
      return await this.userRepository.update({user_id, name: user.name, email: user.email, password: user.password});
    }

    async deleteUser({user_id}){

        await this.userRepository.deleteUser({user_id});
    }
    
}

module.exports = UserCreateService;