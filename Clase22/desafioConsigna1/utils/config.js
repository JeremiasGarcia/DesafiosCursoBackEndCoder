import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    dbSQL3: {
        client: 'better-sqlite3', // or 'better-sqlite3'
        connection: {
            filename: path.join(__dirname, '../DB/dbchat.db3')
        },
        useNullAsDefault: true
    },
    dbMDB: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'clase16'
        }
    }
}
