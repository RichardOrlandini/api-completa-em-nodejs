const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserControllers {

    async create(request, response) {
        const { name, email , password} = request.body;

        const emailExists = await knex('users').where('email', '=', email).first()

        if (emailExists) {
            throw new AppError("Este email já  está em uso!")
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name,
            email,
            password: hashedPassword
        })

        return response.status(201).json();

    }

    async update(request, response) {
        const {name, email, password, old_password } = request.body;
        const { id } = request.params; 

        const user = await knex("users").where({ id }).first();

        if (!user) {
            throw new AppError("Usúario não existe")
        }

        const userWithUpdateEmail = await knex("users").where({email }).first();  

        //Comparando o email encontrado com o email do id que quer fazer o update

        if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
            throw new AppError("Este email já está em uso!")
        }

        
        if (password && old_password) {
            const checkPassword = await compare(old_password, user.password);

            if (!checkPassword) {
                throw new AppError("A senha não confere")
            }

            user.password = await hash(password, 8);
        }else{
            throw new AppError("Informe as senhas")
        }

        const newUser = {
        name: name ?? user.name,
        email: email ?? user.email,
        password: user.password,
        updated_at: new Date()
        }

        await knex("users").where("id", "=", user.id).update(newUser)

        return response.json()

        
    }
}
module.exports = UserControllers