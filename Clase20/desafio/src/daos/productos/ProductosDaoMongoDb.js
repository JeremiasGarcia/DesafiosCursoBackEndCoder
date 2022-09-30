import ContenedorMongoDb from "../../contenedores/ContenedorMongoDB.js";

class ProductosDaoMongoDb extends ContenedorMongoDb{

    constructor(){
        super('productos', {
            nombre: {type: String, require: true},
            precio: {type: Number, require: true},
            fotoUrl: {type: String, require: true}
        });
    }
}

export default ProductosDaoMongoDb;