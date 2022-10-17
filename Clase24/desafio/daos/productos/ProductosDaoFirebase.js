import ContenedorFirebase from "../../container/ContenedorFirebase.js";

class ProductosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('productos');
    }
}

export default ProductosDaoFirebase;