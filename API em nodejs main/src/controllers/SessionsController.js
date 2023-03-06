const knex = require("../database/knex");
const AppError = require("../utils/AppError"); 
const { compare } = require("bcryptjs")
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");


class SessionsController { 
    async create(request, response){
        const { email, password} = request.body;
        console.log(email, password)

        const user = await knex("users").where({email}).then(e => console.log(e))

        if (!user){
            throw new AppError("usuário não cadastrado", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched){
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }
        

        return response.json(user);
    }
};

module.exports = SessionsController;


