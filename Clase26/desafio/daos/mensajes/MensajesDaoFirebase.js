import ContenedorFirebase from "../../container/ContenedorFirebase";

class MensajesDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('mensajes');
    }
}

export default MensajesDaoFirebase;