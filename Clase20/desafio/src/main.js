import mongoose from "mongoose";
import { productoModel } from "./models/productos.model.js";
import { config } from "./utils/config.js";
import ProductosDaoMongoDb from "./daos/productos/ProductosDaoMongoDb.js";

const strConn = config.atlas.strConn;

Main();

async function Main(){
    try {
        await mongoose.connect(strConn);
        // console.log('Productos insertados', await productoModel.insertMany(listProductos));
        // console.log('Lista de productos', await productoModel.find());
    
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}