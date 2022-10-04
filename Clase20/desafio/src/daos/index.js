let productosDao;
let carritosDao;

switch (process.env.PERS) {
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carritos/CarritosFirebase.js')
        
        productosDao = new ProductosDaoFirebase;
        carritosDao = new CarritosDaoFirebase;
        
        break;

    default:
        const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js');
        const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js');
        
        productosDao = new ProductosDaoMongoDb;
        carritosDao = new CarritosDaoMongoDb;
        
        break;
}

export { productosDao, carritosDao}