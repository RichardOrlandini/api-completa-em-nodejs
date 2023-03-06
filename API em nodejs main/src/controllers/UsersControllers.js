const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

const UserRepository = require("../repositories/UserRepository");
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
        
        const user_id = request.user.id
        const { name, email, password, new_password } = request.body
    
        const userExists = await knex('users').where({ email })

        if (userExists.length === 1 && userExists[0].id !== user_id) {
          throw new AppError('Email já cadastrado')
        }
    
        if (password && new_password) {
          const validUserPassword = await knex
            .select('password')
            .from('users')
            .where('id', user_id)
    
          const checkOldPassword = await compare(
            password,
            validUserPassword[0].password
          )
          const att_password = await hash(new_password, 8)
          if (!checkOldPassword) {
            throw new AppError('A senha antiga nao confere')
          }
    
          const user_update = await knex('users').where('id', user_id).update({
            password: att_password
          })
        }
    
        const user_update = await knex('users').where('id', user_id).update({
          name,
          email
        })
    
        return response.json()
      }

    
      async delete(request, response) {
        const { user_id } = request.params
    
        const user_delete = await knex('users').where('id', user_id).delete()
    
        return response.json()
      }
    }

  
    /**
     * 
     * 1 - pegar o id 
     * 2- deleter ele no banco de dados
     * 3- dar o respose.kjson
     * 4- colocar ele na rota
     * 5- testar
      
     */

module.exports = UserControllers
