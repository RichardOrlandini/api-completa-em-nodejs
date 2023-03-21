const knex = require("../../database/knex");

class UserRepository {

    async findByEmail(email){ 
        return await knex('users').where("email", "=", email).first(); 

    }

    async create({name, email, password}){
       const userId =  await knex("users").insert({
            name,
            email,
            password
        });

        return {id: userId}
    }

    async update({ user_id, name, email, password}){
        
        await knex('users').where('id', user_id).update({ name, email, password});
    }
    
    async deleteUser(user_id){
        await knex("users").where({user_id}).delete();
    }

    async findById(user_id){
        return await knex('users').where("id", "=", user_id);
    }
        


}

module.exports = UserRepository