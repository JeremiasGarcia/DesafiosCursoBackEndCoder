import { response } from "express";
import admin from "firebase-admin";
import { config } from "../utils/config.js";

//Se concecta
admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();

class ContenedorFirebase{
    constructor(nombreColeccion){
        this.coleccion = db.collection(nombreColeccion);
    }

    async listarTodos(){
        try {
            const result = [];
            const response = await this.coleccion.get();
            response.forEach(doc => {
                result.push({id: doc.id, ...doc.data()})
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async listar(id){
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error('Elemento no encontrado');
            }else{
                const data = doc.data();
                return {... data, id}
            }
        } catch (error) {
            console.log(error);
        }
    
    }

    async guardar(nuevoObj){
        try {
            const docs = await this.coleccion.add(nuevoObj);
            return {... nuevoObj, id: docs.id};
        } catch (error) {
            console.log(error);
        }
    }

    async actualizar(id, nuevoObj){
        try {
            const doc = await this.coleccion.doc(id).update(nuevoObj);
            if (doc.length == 0) {
                throw new Error('Elemento no encontrado: No se pudo actualizar');
            }else{
                return {... nuevoObj, id: doc.id};
            }
        } catch (error) {
            console.log(error);
        }
    }

    async eliminar(id){
        try {
            const docs = await this.coleccion.doc(id).delete();
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

export default ContenedorFirebase;