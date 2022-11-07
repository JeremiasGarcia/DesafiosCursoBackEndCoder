import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

class UsuariosDaoMongoDb extends ContenedorMongoDb{

    constructor(){
        super('usuarios', {
            nombre: {type: String, require: true},
            password: {type: String, require: true},
            direccion: {type: String, require: true}
        });
    }

    async listar(nombre){
        try {
            const docs = await this.coleccion.find({'nombre': nombre}, {__v: 0}).lean();
            if (docs.length == 0) {
                throw new Error('Elemento no encontrado');
            }else{
                return docs;
            }
        } catch (error) {
            console.log(error);
        }
    
    }
}

export default UsuariosDaoMongoDb;