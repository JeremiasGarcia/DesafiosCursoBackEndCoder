/*---------------------- Desnormalizacion de mensajes ----------------------*/
import { normalize, schema } from 'normalizr';

//Esquema de autor
const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'});

//Esquema de mensaje
const schemaMensaje = new schema.Entity('post', {author: schemaAuthor}, {idAttribute: 'id'});

//Esquema de posts
const schemaMensajes = new schema.Entity('posts', {mensajes: [schemaMensaje]}, {idAttribute: 'email'});


const socket = io();

socket.on('from-server-mensajes', data => {
    console.log('mensajes:', data.res);
    render(data.res);
});

function render(mensajes) {
    var today = new Date();
    var now = today.toLocaleString();
    ///////
    let mensajesNsize = JSON.stringify(mensajes).length;
    let mensajesD = denormalize(mensajes.result, schemaMensajes, mensajes.entities);
    let mensajesDsize = JSON.stringify(mensajesD).length;
    let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize);
    document.getElementById('compresion-info').innerText = porcentajeC;
    const cuerpoMensajesHTML = mensajesD.map((msj)=>{
        return `<span><b><span style="color: blue">${msj.author.email}</span><span style="color: red">[${now}]: </span></b><span style="color: green">${msj.text}</span></b><span><img width="40" src="${msj.author.avatar}" alt=""></span></span>`;
    }).join('<br>');  
    ///////
    // const cuerpoMensajesHTML = mensajes.map((msj)=>{
    //     return `<span><b><span style="color: blue">${msj.author.email}</span><span style="color: red">[${now}]: </span></b><span style="color: green">${msj.text}</span></b><span><img width="40" src="${msj.author.avatar}" alt=""></span></span>`;
    // }).join('<br>');  
    console.log(cuerpoMensajesHTML);  

    document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
}

function enviarMensaje() {
    const inputEmail = document.querySelector('#email');
    const inputNombre = document.querySelector('#user');
    const inputApellido = document.querySelector('#apellido');
    const inputEdad = document.querySelector('#edad');
    const inputAlias = document.querySelector('#alias');
    const inputAvatar = document.querySelector('#avatar');
    const inputContenido = document.querySelector('#contenidoMensaje');

    const mensaje = {
        author:{
            email: inputEmail.value,
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: inputEdad.value,
            alias: inputAlias.value,
            avatar: inputAvatar.value,
        },
        text: inputContenido.value,
        idMensajes: 'mensajes'
    }

    socket.emit('from-client-mensaje', mensaje);
}
