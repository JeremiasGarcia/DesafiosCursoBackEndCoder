/*-------------------------- Modulos ------------------------*/
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

/*-------------------- Instancia de servidor ----------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/*----------------------- Middlewares ---------------------- */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*----------------------- Motores de plantilla ---------------------- */
app.engine('hbs', exphbs.engine({
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

const DB_PRODUCTOS = [
    // { 
    //     id: 1,
    //     nombre: "Calculadora",
    //     precio: 99.99,
    //     fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" 
    // }
];

/*--------------------------- Rutas -------------------------*/
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

app.get('/', (req, res)=> {
    res.render('vista', {DB_PRODUCTOS});
});

app.post('/productos', (req, res)=>{
    let newId;
    const m = DB_PRODUCTOS.length;
    if (m !== 0) {
        newId = DB_PRODUCTOS[m - 1]['id'] + 1;
    }else{
        newId = 1;
    }
    const newProd = {id: newId, ...req.body};
    
    DB_PRODUCTOS.push(newProd);

    io.sockets.emit('update-products', {DB_PRODUCTOS});
    
    res.redirect('/');

});

/*------------------------ Servidor -------------------------*/
const PORT = 3000;
const server = httpServer.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
})

/*------------------------- WebSocket -----------------------*/
io.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado! ${socket.id}`);
    socket.emit('from-server-mensajes', {DB_MENSAJES});

    socket.on('from-client-mensaje', mensaje => {
        DB_MENSAJES.push(mensaje);
        io.sockets.emit('from-server-mensajes', {DB_MENSAJES});
    });
})
