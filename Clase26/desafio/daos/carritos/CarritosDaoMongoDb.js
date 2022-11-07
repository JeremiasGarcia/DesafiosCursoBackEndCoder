import ContenedorMongoDb from "../../container/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb{

    constructor(){
        super('carritos', {
            productos: {type: [], require: true}
        });

    }
    
    async guardar(carrito = {productos: []}){
        return super.guardar(carrito);
    }
}

export default CarritosDaoMongoDb;