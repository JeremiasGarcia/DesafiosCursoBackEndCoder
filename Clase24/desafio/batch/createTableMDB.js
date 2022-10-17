import knex from 'knex';
import { config } from '../utils/config.js';

const knexCliMDB = knex(config.dbMDB);

knexCliMDB.schema.dropTableIfExists('productos')
    .then(()=>{
        knexCliMDB.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('nombre', 50).notNullable();
            table.integer('precio', 50).notNullable();
            table.string('fotoUrl', 50).notNullable();
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