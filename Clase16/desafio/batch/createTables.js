import knex from 'knex';
import { configMDB } from '../utils/config.js';

const knexCli = knex(configMDB.db);

knexCli.schema.dropTableIfExists('productos')
    .then(()=>{
        knexCli.schema.createTable('productos', table => {
            table.increments('id').primary();
            table.string('nombre', 50).notNullable();
            table.string('precio', 50).notNullable();
            table.string('fotoUrl', 255).notNullable();
        })
            .then(()=> console.log("Tabla creada"))
            .catch(err=> {
                console.log(err); 
                throw err;
            })
            .finally(()=>{
                knexCli.destroy();
            });
    });
