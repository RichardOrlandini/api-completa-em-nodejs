const knex = require("../database/knex")

const NoteRepository = require("../repositories/NotesRepositories/NoteRepository");

class NotesControllers {
    
    async create(requeste, response){
        const {title, description, tags, links} = requeste.body;
        const user_id = requeste.user.id;

        const noteRepository =  new NoteRepository();

        await noteRepository.create({title, description, tags, links, user_id})

        return response.status(201).json()
    }
    
    async show(request, response){
        const {id} = request.params;

        const noteRepository = new NoteRepository();

        const notes = await noteRepository.show(id);

        return response.json({notes});

    }

    async delete(request, response){
        const {id} = request.params;

        await knex("notes").where({id}).delete();

        return response.json();

    }

    async  index(request, response){
        const { title, tags} = request.query;
        const user_id = request.user.id;
        
        const noteRepository = new NoteRepository();
        const notes = await noteRepository.index({title, tags, user_id});
        

        return response.json(notes)
    }
}
module.exports = NotesControllers;   