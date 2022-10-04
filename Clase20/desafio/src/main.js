import mongoose from "mongoose";
import { productoModel } from "./models/productos.model.js";
import { carritoModel } from "./models/carritos.model.js";
import { config } from "./utils/config.js";
import ProductosDaoMongoDb from "./daos/productos/ProductosDaoMongoDb.js";

const strConn = config.atlas.strConn;
const listCarrito = [
                        {
                            productos: [
                                            { nombre: "Calculadora", precio: 120, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
                                            { nombre: "Teclado", precio: 580, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
                                            { nombre: "Mouse", precio: 900, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" }
                                        ]
                        }
]

Main();

async function Main(){
    try {
        await mongoose.connect(strConn);
        console.log('Carritos insertados', await carritoModel.insertMany(listCarrito));
        // console.log('Lista de carritos', await carritoModel.find());
    
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
    }
}

// CRUD();

// async function CRUD() {
//   try {
//     //Conf modelo de collection a utilizar
//     const db = admin.firestore();
//     const productos = db.collection('productos');

//     /* ------------------------------------------------------------------- */
//     /*   Escritura de la base de datos collection: productos                */
//     /* ------------------------------------------------------------------- */
//     const productosList = [
//         { nombre: "Calculadora", precio: 120, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Teclado", precio: 580, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Mouse", precio: 900, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Monitor", precio: 1280, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Auricular", precio: 1700, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Mouse Pad", precio: 2300, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Pendrive", precio: 2860, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Parlante", precio: 3350, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Celular", precio: 4320, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" },
//         { nombre: "Notebook", precio: 4990, fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" }
//     ]

//     for (const productos of productosList) {
//       let doc = productos.doc();//id generado automaticamente
//       //let id = 1;
//       //let doc = productos.doc(`${id}`); // id de forma manual
//       await doc.create(productos);
//     }
//     console.log('productos insertados');
    
//     } catch (error) {
//         console.log(error);
//     }  
// }