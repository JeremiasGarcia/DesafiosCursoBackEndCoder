const express = require('express');
const routerProductos = express.Router();

/*DB*/
const DB_PRODUCTOS = [
                        {
                        "id": 1,
                        "producto": "Mouse",
                        "precio": 100,
                        "thumbnail": "https://www.google.com/search?q=mouse&sxsrf=ALiCzsZ6h_7VdX5E319OImNPoDCLb9-v7A:1661189358978&source=lnms&tbm=isch&sa=X&ved=2ahUKEwij15XN_Nr5AhUXqZUCHT2JB9oQ_AUoAXoECAMQAw&biw=1920&bih=937&dpr=1#imgrc=h5I6Ls0Ym2nqzM"
                         },
                        {
                            "id": 3,
                            "producto": "Monitor",
                            "precio": 300,
                            "thumbnail": 'https://www.google.com/search?q=monitor&tbm=isch&ved=2ahUKEwib1ujN_Nr5AhUqg5UCHRncDxsQ2-cCegQIABAA&oq=monitor&gs_lcp=CgNpbWcQAzIHCAAQsQMQQzIHCAAQsQMQQzIECAAQQzIECAAQQzIHCAAQsQMQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzIECAAQQzoECCMQJzoICAAQgAQQsQM6BAgAEANQqg5YpxNgihVoAHAAeACAAVeIAd4DkgEBNpgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=8LwDY5ueFKqG1sQPmbi_2AE&bih=937&biw=1920#imgrc=-ZBLgZ1sKQEHfM'
                        }
                    ];

routerProductos.get('/', (req, res)=>{
    res.status(200).json(DB_PRODUCTOS);
});

routerProductos.get('/:id', (req, res)=>{
    const prod = DB_PRODUCTOS.find( p => p.id == req.params.id );
    if (!prod) return res.status(404).json({error: "Producto no encontrado!"});
    res.status(200).json(prod);
});

routerProductos.post('/', (req, res)=>{
    const m = DB_PRODUCTOS.length;
    const newId = DB_PRODUCTOS[m - 1]['id'] + 1;
    console.log(req.body);
    const newProd = {id: newId, ...req.body};
    console.log(newProd);
    DB_PRODUCTOS.push(newProd);
    res.status(201).json({msg: 'Agregado!', data: newProd});
});

routerProductos.put('/:id', (req, res)=>{
    let prod = DB_PRODUCTOS.find( p => p.id == req.params.id );
    if (req.body.producto) {
        prod.producto = req.body.producto
    }
    if (req.body.precio) {
        prod.precio = req.body.precio
    }
    if (req.body.thumbnail) {
        prod.thumbnail = req.body.thumbnail
    }
    if (!prod) return res.status(404).json({error: "Producto no encontrado!"});
    res.status(201).json({msg: 'Modificado!', data: prod});
});

routerProductos.delete('/:id', (req, res)=>{
    const prod = DB_PRODUCTOS.find( p => p.id == req.params.id );
    if (prod) {
        function buscarIndex(x) {
            return x === prod;
        }
        let index = DB_PRODUCTOS.findIndex(buscarIndex);
        DB_PRODUCTOS.splice(index);
    }
    if (!prod) return res.status(404).json({error: "Producto no encontrado!"});
    res.status(200).json({msg: 'Eliminado!', data: prod});
});

module.exports = routerProductos;
