import express from 'express';
import productosRouter from './routes/productos.routes.js';
import carritosRouter from './routes/carritos.routes.js';

/*--------Instancia del servidor---------*/
const app = express();

/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/*--------------------------- Rutas -------------------------*/
app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

/*------------------------ Servidor -------------------------*/
const PORT = 3000;
const servidor = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

