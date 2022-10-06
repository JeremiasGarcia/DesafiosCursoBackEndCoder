const socket = io();

socket.on('from-server-mensajes', data => {
    // console.log('mensajes:', data.DB_MENSAJES);
    renderMessages(data.DB_MENSAJES);
});

socket.on('update-products', data => {
    console.log('productos:', data.DB_PRODUCTOS);
    renderProducts(data.DB_PRODUCTOS);
});

function renderMessages(mensajes) {
    const cuerpoMensajesHTML = mensajes.map((msj)=>{
        return `<span><b>${msj.author}: </b><span>${msj.text}</span></span>`;
    }).join('<br>');  
    // console.log(cuerpoMensajesHTML);  

    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
}

function renderProducts(producto) {
    // const tablaProductos = document.getElementById('listaProductos');
    const cuerpoTabla = document.createElement('tbody');
    
    const filaProduct = producto.map((prod) => {
        console.log(`producto en render:`);
        console.log(prod.nombre);

        let tr = document.createElement('tr');
        let td = document.createElement('td');

        td.innerText = prod.nombre;
        tr.appendChild(td);
        
        td = document.createElement('td');
        td.innerText = prod.precio;
        tr.appendChild(td);
    
        td = document.createElement('td');
        td.innerText = prod.img;
        tr.appendChild(td);

        cuerpoTabla.appendChild(td);
    });

    filaProduct.appendChild(cuerpoTabla);

    // document.querySelector('#listaProductos').appendChild = filaProduct;

}

function enviarMensaje() {
    const inputUser = document.querySelector('#user');
    const inputContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }

    socket.emit('from-client-mensaje', mensaje);
}
