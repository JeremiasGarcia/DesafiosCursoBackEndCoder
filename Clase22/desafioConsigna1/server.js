/*-------------------------- Modulos ------------------------*/
import express from 'express';
import * as path from 'path'
import { engine } from 'express-handlebars';
import { createServer as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import { Contenedor as ContenedorSQL3 } from "./container/ContenedorSQL3.js";
// import { Contenedor as ContenedorMDB } from "./container/ContenedorMDB.js";
import ProductosDaoMongoDb from "./daos/productos/ProductosDaoMongoDb.js";
import ProductosDaoFirebase from "./daos/productos/ProductosDaoFirebase.js";
import MensajesDaoMongoDb from "./daos/mensajes/MensajesDaoMongoDb.js"

import { faker } from '@faker-js/faker';

const apiProductos = new ProductosDaoMongoDb('productos');
const apiMensajes = new MensajesDaoMongoDb('mensajes');


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

/*---------------------- Normalizacion de mensajes ----------------------*/
import { normalize, schema } from 'normalizr';

//Esquema de autor
const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'});

//Esquema de mensaje
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'});

//Esquema de posts
const schemaMensajes = new schema.Entity('posts', {mensajes: [schemaMensaje]}, {idAttribute: 'email'});

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes);

async function listarMensajesNormalizados(){
    const mensajes = await apiMensajes.listarTodos();
    const normalizados = normalizarMensajes({ id: 'mensajes', mensajes});
    return normalizados;
}

/*------------------------ Rutas -------------------------*/
app.get('/', async (req, res)=> {
    const prod = await apiProductos.listarTodos();
    res.render('vista', {prod});
});

app.get('/api/productos-test', (req, res)=> {
    let randomNombre;
    let randomPrecio;
    let randomFotoUrl;
    let prod = {};
    let prods = [];
    for (let i = 0; i < 5; i++) {
        randomNombre = faker.commerce.productName();
        randomPrecio = faker.commerce.price();
        randomFotoUrl = faker.image.business();
        prod = {nombre: randomNombre, precio: randomPrecio, fotoUrl: randomFotoUrl };
        prods.push(prod);
    }
    res.render('random', {prods});
});

app.post('/productos', async (req, res)=>{
    const resp = await apiProductos.guardar(req.body);
    res.redirect('/');
});

/*------------------------ Servidor -------------------------*/
const PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

/*------------------------- WebSocket -----------------------*/
io.on('connection', async (socket) => {
    // let res;
    // res = await apiMensajes.listarTodos();
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-mensajes', listarMensajesNormalizados());

    socket.on('from-client-mensaje', async mensaje => {
        res = await apiMensajes.guardar(mensaje);
        io.sockets.emit('from-server-mensajes', {res});
    });
})