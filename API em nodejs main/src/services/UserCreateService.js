const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");


class UserCreateService {

    constructor(userRepository){ //executa no momento da instância
        this.userRepository = userRepository;
    }

    async execute({name, email, password}){
        const checkUserExists = await this.userRepository.findByEmail(email)

        if (checkUserExists) { 
            throw new AppError("Este email já  está em uso!")
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.userRepository.create({name, email, password: hashedPassword});

        return userCreated;
    }
}

module.exports = UserCreateService;