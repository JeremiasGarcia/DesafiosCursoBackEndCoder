import mongoose from "mongoose";
import { config } from "../utils/config.js";

const strConn = config.atlas.strConn;
await mongoose.connect(config.atlas.strConn);

class ContenedorMongoDb{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion, esquema);
    }

    async listarTodos(){
        try {
            const docs = await this.coleccion.find({}, {__v: 0}).lean();
            return docs;
        } catch (error) {
            console.log(error);
        }
    }

    async listar(id){
        try {
            const docs = await this.coleccion.find({'_id': id}, {__v: 0}).lean();
            if (docs.length == 0) {
                throw new Error('Elemento no encontrado');
            }else{
                return docs;
            }
        } catch (error) {
            console.log(error);
        }
    
    }

    async guardar(nuevoObj){
        try {
            const docs = await this.coleccion.create(nuevoObj);
            return docs;
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(id, nuevoObj){
        try {
            const docs = await this.coleccion.updateOne({ '_id': id }, nuevoObj);
            if (docs.length == 0) {
                throw new Error('Elemento no encontrado: No se pudo actualizar');
            }else{
                return docs;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(id){
        try {
            const docs = await this.coleccion.deleteOne({'_id': id});
            if (docs.length == 0) {
                throw new Error('Elemento no encontrado: No se pudo eliminar');
            }else{
                return docs;
            }
        } catch (error) {
            console.log(error);
        }
    
    }
}

export default ContenedorMongoDb;