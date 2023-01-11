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
        const { user_id } = request.user.id; 
        
        console.log(user_id)

        const user = await knex("users").where("id", "=", user_id);

        if (!user) {
            throw new AppError("Usuário não existe")    
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

         knex("users").where("id", "=", user_id).update(newUser).then(p => console.log(p))
         .catch(err => console.log(err));

        return response.json()

        
    }

    async delete(request, response){
        const {user_id} = request.body;

        await knex("users").where("id", "=", user_id).delete();

        return response.json();
    }

    /**
     * 
     * 1 - pegar o id 
     * 2- deleter ele no banco de dados
     * 3- dar o respose.kjson
     * 4- colocar ele na rota
     * 5- testar
     * 
     * 
     */
}
module.exports = UserControllers