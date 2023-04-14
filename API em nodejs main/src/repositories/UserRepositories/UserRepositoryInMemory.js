class UserRepositoryInMemory {
    users = [];

    async create({name,email,password}){

        const user={
            id: Math.floor(Math.random()*1000)+1,
            email,
            name,
            password
        }

        this.users.push({user})
        return user
    }

    async update({ user_id, name, email, password}) {
        //   await knex('users').where('id', user_id).update({ name, email, password});
        const user =  this.users.find(user => user.id === user_id);
        const updateUser = {
            id: user.id,
            name: name ?? user.name ,
            email: email ?? user.email,
            password: password ?? user.password
        };
        this.users.pop();
        this.users.push(updateUser);

        return updateUser;
    }

    async findByEmail({email}){
        return this.users.find(user => user.email === email);
    }

    async deleteUser(user_id){

       const userDeletad = this.users.find(user => user.id === user_id);
       const pos = this.users.indexOf(userDeletad);
       this.users.splice(pos, 1);

        return this.users;
    }
}

module.exports = UserRepositoryInMemory;