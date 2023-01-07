
exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id"); //campo de incremento de id.
    table.text("url").notNullable();

    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
 });
 
 exports.down = knex =>  knex.schema.dropTable("links");
 