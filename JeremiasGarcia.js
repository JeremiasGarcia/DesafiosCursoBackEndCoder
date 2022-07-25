class Persona{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascotas(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        const cantidadDeMascotas = this.mascotas.length;
        return cantidadDeMascotas;
    }

    addBook(nombre, autor){
        this.libros.push(
            {
                'nombre': nombre,
                'autor': autor
            }
        );
    }

    getBookNames(){
        const nombreDeLibros = this.libros.map(function(item){
            return item.nombre;
        });

        return nombreDeLibros;
    }
}

const usuario = new Persona('Jeremias', 'Garcia', [{nombre: 'Harry Potter', autor: 'J. K. Rowling'}], ['Perro']);

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());

usuario.addMascotas('Gato');
usuario.addBook('Game Of Thrones', 'George R. R. Martin');

console.log(usuario.countMascotas());
console.log(usuario.getBookNames()); 