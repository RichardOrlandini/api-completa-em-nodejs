

class NoteRepository {

    async create({title, description, tags, links, user_id }){
     
        const note_id = await knex("notes").where({user_id}).insert({
            title,
            description,
            user_id
        });

        const tagsInsert = tags.map(name  =>{
            return {
                note_id,
                name,
                user_id
                
            }
        });
        
        await knex("tags").insert(tagsInsert);

        const linksInsert = links.map(links => {
            return {
                note_id,
                url: links
            }
        });

        await knex("links").insert(linksInsert);
    }

    async show({user_id}){

        const note = await knex("notes").where({id: user_id}).first();
        const tags = await knex("tags").where({note_id: user_id}).orderBy("name");
        const links = await knex("links").where({note_id: user_id}).orderBy("created_at")

        const notes = {...note,tags,links};


        return notes;
    }

    async index({title, tags, user_id}){

        let notes; 
        
        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());
            
            notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id",  user_id)
            .whereLike("notes.title", `%${title}%` )
            .where("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .groupBy("notes.id")
            .orderBy("notes.title")

        }else{

            notes =  await knex("notes")
            .where({user_id})
            .whereLike("title",`%${title}%`)
            .orderBy("title");

        }

        const userTags = await knex("tags").where({user_id});

        const notesWithTags =  notes.map(note => {
            
        const noteTags = userTags.filter(tag => tag.note_id === note.id);
            
            return {
                ...note,
                tags: noteTags
            }
        });

        return notesWithTags;
    }
}

module.exports = NoteRepository;