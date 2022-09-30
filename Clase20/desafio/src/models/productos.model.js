import { Schema, model } from "mongoose";

const productoSchema = Schema({
    nombre: {type: String, require: true},
    precio: {type: Number, require: true},
    fotoUrl: {type: String, require: true}
});

export const productoModel = model('productos', productoSchema);