const path = require('path');


module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, "src", "database", "database.db")
        },
        pool: { //Vai ser executado no momento de criação do bd
            afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) //Para deleter em cascata as tags.
        },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
        },
        useNullAsDefault: true
    },
};