import knex from 'knex';
import { config } from '../utils/config.js';

const knexCliSQL3 = knex(config.dbSQL3);
const knexCliMDB = knex(config.dbMDB);

knexCliSQL3.schema.dropTableIfExists('mensajes')
    .then(()=>{
        knexCliSQL3.schema.createTable('mensajes', table => {
            table.string('author', 50).notNullable();
            table.string('text', 50).notNullable();
        })
            .then(()=> console.log("Tabla creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCliSQL3.destroy();
            });
    });

knexCliMDB.schema.dropTableIfExists('mensajes')
    .then(()=>{
        knexCliMDB.schema.createTable('mensajes', table => {
            table.string('author', 50).notNullable();
            table.string('text', 50).notNullable();
        })
            .then(()=> console.log("Tabla creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCliMDB.destroy();
            });
    });
