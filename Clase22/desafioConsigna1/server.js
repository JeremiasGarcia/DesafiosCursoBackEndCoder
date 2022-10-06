/*-------------------------- Modulos ------------------------*/
import express from 'express';
import * as path from 'path'
import { engine } from 'express-handlebars';
import { createServer as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import { Contenedor as ContenedorSQL3 } from "./container/ContenedorSQL3.js";
import { Contenedor as ContenedorMDB } from "./container/ContenedorMDB.js";

import { faker } from '@faker-js/faker';


/*-------------------- Instancia de servidor ----------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/*----------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*----------------------- Motores de plantilla ---------------------- */
app.engine('hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs'
}));
app.set('views', './views');
app.set('view engine', 'hbs');

/*---------------------- Base de datos ----------------------*/
const DB_MENSAJES = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
]

/*------------------------ Rutas -------------------------*/
const apiProductos = new ContenedorMDB('productos');

app.get('/', async (req, res)=> {
    const productos = await apiProductos.listarTodos();
    res.render('vista', {productos});
});

app.get('/api/productos-test', (req, res)=> {
    let randomNombre;
    let randomPrecio;
    let randomFotoUrl;
    let prod = {};
    let prods = [];
    for (let i = 0; i < 4; i++) {
        randomNombre = faker.commerce.productName();
        randomPrecio = faker.commerce.price();
        randomFotoUrl = faker.image.business();
        prod = {nombre: randomNombre, precio: randomPrecio, fotoUrl: randomFotoUrl };
        prods.push(prod);
    }
    res.render('random', {prods});
});

app.post('/productos', async (req, res)=>{
    const resp = await apiProductos.insertar(req.body);
    res.redirect('/');

});

/*------------------------ Servidor -------------------------*/
const PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

/*------------------------- WebSocket -----------------------*/
const apiMensajes = new ContenedorSQL3('mensajes');

io.on('connection', async (socket)=>{
    // let res;
    // res = await apiMensajes.listarTodos();
    // console.log(`Nuevo cliente conectado! ${socket.id}`);
    // socket.emit('from-server-mensajes', {res});
    // // socket.emit('from-server-mensajes', {DB_MENSAJES});

    // socket.on('from-client-mensaje', async mensaje => {
    //     res = await apiMensajes.insertar(mensaje);
    //     io.sockets.emit('from-server-mensajes', {res});
    //     // DB_MENSAJES.push(mensaje);
    //     // io.sockets.emit('from-server-mensajes', {DB_MENSAJES});
    // });
})