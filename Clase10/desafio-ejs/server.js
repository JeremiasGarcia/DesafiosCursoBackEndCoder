/* ---------------------- Modulos ----------------------*/
const express = require('express');
const path = require('path');

/* ---------------------- Instancia Server ----------------------*/
const app = express();

/* ---------------------- Middlewares ----------------------*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

//Motores de plantilla
app.set('views', './views');
app.set('view engine', 'ejs');

//DB
const DB_PRODUCTOS = [
                        // { 
                        //     id: 1,
                        //     nombre: "Calculadora",
                        //     precio: 99.99,
                        //     fotoUrl: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png" 
                        // }
                    ];

/* ---------------------- Rutas ----------------------*/
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
    res.redirect('/');
});

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})
//Servidor escuchando en el puerto ${server.address().port}
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
