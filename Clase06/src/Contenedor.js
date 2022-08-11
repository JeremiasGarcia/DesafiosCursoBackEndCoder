const fs = require('fs/promises');
const ruta = './archivos/productos.json';

class Contenedor {
    constructor(){}

    async getAll() {
        try {
            const objs = await fs.readFile(ruta, 'utf-8');
            return JSON.parse(objs);
            
        } catch (error) {
            console.log(error);
        }
    }

    async getRandom() {

        try {
            const objs = await fs.readFile(ruta, 'utf-8');
            const cantidad = JSON.parse(objs).length;
            var aleatorio = Math.round(Math.random()*(cantidad - 1) + 1);
            return JSON.parse(objs)[aleatorio - 1];
            
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Contenedor;