import { Schema, model } from "mongoose";

const carritoSchema = Schema({
    productos: {type: [], require: true}
});

export const carritoModel = model('carritos', carritoSchema);