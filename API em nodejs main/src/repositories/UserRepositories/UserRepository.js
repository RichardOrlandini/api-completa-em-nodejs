const knex = require("../../database/knex");

class UserRepository {

    async findByEmail(email){
        const user = await knex('users').where('email', email).first();

        return user;
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

        const user = this.findByEmail(email);
        
        if ( password ){
            await knex('users')
            .where('id', user_id)
            .update({ 
                password: password,
            })
        }

        await knex('users')
        .where('id', user_id)
        .update({ 
            name: name ?? user[0].name,
            email: email ?? user[0].email,
        })
    }
    
    async deleteUser({user_id}){
        await knex("users").where({user_id}).delete();
    }

        


}

module.exports = UserRepository