import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

class MensajesDaoMongoDb extends ContenedorMongoDb{

    constructor(){
        super('mensajes', {
            author: {
                email: {type: String, require: true},
                nombre: {type: String, require: true},
                apellido: {type: String, require: true},
                edad: {type: Number, require: true},
                alias: {type: String, require: true},
                avatar: {type: String, require: true}
            },
            text: {type: String, require: true},
            id: {type: String, require: true}
        });
    }
}

export default MensajesDaoMongoDb;