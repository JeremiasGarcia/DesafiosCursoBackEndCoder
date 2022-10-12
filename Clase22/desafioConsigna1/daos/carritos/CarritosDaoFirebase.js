import ContenedorMongoDb from "../../contenedores/ContenedorMongoDB.js";

class CarritosDaoFirebase extends ContenedorMongoDb{

    constructor(){
        super('carritos');
    }
    
    async guardar(carrito = {productos: []}){
        return super.guardar(carrito);
    }
}

export default CarritosDaoFirebase;