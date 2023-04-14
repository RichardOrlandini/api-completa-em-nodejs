const UserRepository = require("../repositories/UserRepositories/UserRepository");
const SessionsCreateService = require("../services/SessionsCreateService");

class SessionsController { 
    async create(request, response){
        const { email, password} = request.body;

        const userRepository = new UserRepository();
        const sessionsCreateService = new SessionsCreateService(userRepository);

        const {user, token} =  await sessionsCreateService.execute({email, password});

        return response.json({user, token});
    }
};

module.exports = SessionsController;


