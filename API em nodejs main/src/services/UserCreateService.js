const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");


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

        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists.length === 1 && checkUserExists[0].id !== user_id) {
          throw new AppError('Email já cadastrado')
        }

        if (password && new_password) {
          const checkOldPassword = await compare(password,checkUserExists[0].password)

            if (!checkOldPassword){
              throw new AppError("A senha antiga não confere")
            }

            const att_password = await hash(new_password, 8)
           
            await this.userRepository.update({password:att_password })
          }

        await this.userRepository.update({
            name,
            email,
          })
    }

    async deleteUser({user_id}){

        await this.userRepository.deleteUser({user_id});
    }
    
}

module.exports = UserCreateService;