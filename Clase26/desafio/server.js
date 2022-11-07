/*-------------------------- Modulos ------------------------*/
import express from 'express';
import session from "express-session";
import * as path from 'path'
import { engine } from 'express-handlebars';
import { createServer as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

import { Contenedor as ContenedorSQL3 } from "./container/ContenedorSQL3.js";
// import { Contenedor as ContenedorMDB } from "./container/ContenedorMDB.js";
import ProductosDaoMongoDb from "./daos/productos/ProductosDaoMongoDb.js";
import ProductosDaoFirebase from "./daos/productos/ProductosDaoFirebase.js";
import MensajesDaoMongoDb from "./daos/mensajes/MensajesDaoMongoDb.js";
import UsuariosDaoMongoDb from './daos/usuarios/UsuariosDaoMongoDB.js';

import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy } from "passport-local";
const LocalStrategy = Strategy;


const apiProductos = new ProductosDaoMongoDb('productos');
const apiMensajes = new MensajesDaoMongoDb('mensajes');
const apiUsuarios = new UsuariosDaoMongoDb('usuarios');


/*-------------------- Instancia de servidor ----------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/*----------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(new LocalStrategy(
    async function(username, password, done) {
        // console.log(`nombre:${username} password: ${password}`)
        //Logica para validar si un usuario existe
        // const existeUsuario = await usuariosDB.find(usuario => usuario.nombre == username);
        const existeUsuario = await apiUsuarios.listar(username);

        // console.log(`existe usuario: ${existeUsuario}`);

        if (!existeUsuario) {
            // console.log(`no existe`);
            return done(null, false);
        } else {
            // console.log(`existe`);
            return done(null, existeUsuario);
        }
    }
));

passport.serializeUser((username, done)=>{
    done(null, username);
});

passport.deserializeUser(async (username, done)=>{
    // const existeUsuario = usuariosDB.find(usuario => usuario.nombre == nombre);
    const existeUsuario = await apiUsuarios.listar(username);
    done(null, username);
});

/*----------------------- Session ---------------------- */
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000 //20 seg
    }
}))

app.use(passport.initialize());
app.use(passport.session());


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
const usuariosDB = [
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
// app.get('/', async (req, res)=> {
//     const prod = await apiProductos.listarTodos();
//     res.render('vista', {prod});
// });
app.get('/vista', async (req, res)=> {
    const prod = await apiProductos.listarTodos();
    res.render('vista', {prod});
});

app.get('/', (req, res)=>{
    res.redirect('/login')
})

app.get('/login', (req, res)=>{
    res.render('login.hbs');
})

app.get('/register', (req, res)=>{
    res.render('registro.hbs');
})

app.post('/login', passport.authenticate('local',  {successRedirect: '/vista', failureRedirect: '/login-error'} ));

app.post('/register', async (req, res)=>{
    const {nombre, password, direccion } = req.body;
    
    // const newUsuario = usuariosDB.find(usuario => usuario.nombre == nombre);
    const newUsuario = await apiUsuarios.listar(nombre);
    if (newUsuario) {
        res.render('register-error')
    } else {
        // usuariosDB.push({nombre, password: password, direccion});
        await apiUsuarios.guardar({nombre, password: password, direccion});
        res.redirect('/login')
    }
})

app.get('/logout', (req, res)=> {
    req.logOut(err => {
        res.redirect('/');
    });
})

app.get('/login-error', (req, res)=>{
    res.render('login-error');
})


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