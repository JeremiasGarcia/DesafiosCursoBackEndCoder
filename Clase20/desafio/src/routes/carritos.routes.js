import { Router } from 'express';
import { carritosDao as apiCarritos, productosDao as apiProductos } from '../daos/index.js'
// import CarritosDaoMongoDb from '../daos/carritos/CarritosDaoMongoDb.js';
// import ProductosDaoMongoDb from '../daos/productos/ProductosDaoMongoDb.js';

const carritosRouter = Router();
// const apiCarritos = new CarritosDaoMongoDb();
// const apiProductos = new ProductosDaoMongoDb();

carritosRouter.get('/', async (req, res)=> {
    const carritos = await apiCarritos.listarTodos();
    res.json(carritos);
});

carritosRouter.get('/:id', async (req, res)=> {
    const carritos = await apiCarritos.listar(req.params.id);
    res.json(carritos);
});

carritosRouter.post('/', async (req, res)=> {
    const carritos = await apiCarritos.guardar(req.body);
    res.json(carritos);
});

carritosRouter.post('/:id/productos', async (req, res)=> {
    const carrito = await apiCarritos.listar(req.params.id)
    const producto = await apiProductos.listar(req.body._id);
    carrito.productos.push(producto);
    await apiCarritos.actualizar(carrito);
    res.json(carrito);

});

carritosRouter.delete('/:id', async (req, res)=> {
    const carritos = await apiCarritos.eliminar(req.params.id);
    res.json(carritos);
});

export default carritosRouter;