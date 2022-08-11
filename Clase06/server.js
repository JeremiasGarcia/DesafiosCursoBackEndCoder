const express = require('express');
const Contenedor = require('./src/Contenedor');

const app = express();
const contenedor = new Contenedor;

const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Servidor iniciado con express!');
});

app.get('/productos', async (req, res) => {
    res.send(await contenedor.getAll());
});

app.get('/productoRandom', async (req, res) => {
    res.send(await contenedor.getRandom());
    // res.send(contenedor.prueba());
});

const server = app.listen(PORT, () => {
    console.log(`Servidor htt escuchando en hhttp://localhost:8080`);
});