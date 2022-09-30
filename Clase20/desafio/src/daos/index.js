let productosDao;
let carritosDao;

switch (process.env.PERS) {
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js');
        const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js');
        
        productosDao = new ProductosDaoMongoDb;
        carritosDao = new CarritosDaoMongoDb;
        
        break;

    default:
        // const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        // const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')
        
        // productosDao = new ProductosDaoFirebase;
        // carritosDao = new CarritosDaoFirebase;
        
        break;
}

export { productosDao, carritosDao}