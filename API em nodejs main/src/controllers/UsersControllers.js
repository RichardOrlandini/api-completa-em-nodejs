const UserRepository = require("../repositories/UserRepositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UserControllers {
  
    async create(request, response) {
        const { name, email , password} = request.body;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);

         await userCreateService.execute({name, email, password});

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, new_password } = request.body;
        const user_id = request.user.id;

        const userRepository = new UserRepository();


        const userCreateService =  new UserCreateService(userRepository);

        await userCreateService.executeUpdate({name, email, password, new_password,  user_id});

        return response.json();
    }
    
    async delete(request, response) {
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);
        
        await userCreateService.deleteUser({user_id})
    
        return response.status(200).json();
    }
}

module.exports = UserControllers
