import { Router } from 'express';
import { productosDao as apiProductos } from '../daos/index.js'
// import ProductosDaoMongoDb from '../daos/productos/ProductosDaoMongoDb.js';
// import ProductosDaoFirebase from '../daos/productos/ProductosDaoFirebase.js';

const productosRouter = Router();
// const apiProductos = new ProductosDaoMongoDb();
// const apiProductos = new ProductosDaoFirebase();

productosRouter.get('/', async (req, res)=> {
    const productos = await apiProductos.listarTodos();
    res.json(productos);
});

productosRouter.get('/:id', async (req, res)=> {
    const productos = await apiProductos.listar(req.params.id);
    res.json(productos);
});

productosRouter.post('/', async (req, res)=> {
    const productos = await apiProductos.guardar(req.body);
    res.json(productos);
});

productosRouter.put('/:id', async (req, res)=> {
    const productos = await apiProductos.actualizar(req.params.id, req.body);
    res.json(productos);
});

productosRouter.delete('/:id', async (req, res)=> {
    const productos = await apiProductos.eliminar(req.params.id);
    res.json(productos);
});

export default productosRouter;