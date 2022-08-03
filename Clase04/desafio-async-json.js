const fs = require('fs/promises');
const ruta = './Clase04/archivos/desafio-data.json';

async function save(obj) {
    const objs = await getAll();
    let newId;

    if (objs.length == 0) {
        newId = 1;    
    }else{
        newId = objs[objs.length - 1].id + 1
    }

    const newObjs = {id: newId, ...obj}
    objs.push(newObjs);

    try {
        await fs.writeFile(ruta, JSON.stringify(objs, null, 2));
        return newId;
    } catch (error) {
        console.log(error);
    }
}

async function getById(id) {
    const objs = await getAll();
    let obj;
    try {
        obj = objs[id - 1];
        if (obj) {
            return obj;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getAll() {
    try {
        const objs = await fs.readFile(ruta, 'utf-8');
        return JSON.parse(objs);
        
    } catch (error) {
        console.log(error);
    }
}

async function deleteById(id) {
    const objs = await getAll();
    let newObjs;
    
    try {
        if (objs.length != 0) {
            if (objs.id == id) {
                objs.forEach(obj => {
                    if (obj.id == id) {
                        newObjs = objs.filter(newObj => newObj != obj);
                    }
                });
                await fs.writeFile(ruta, JSON.stringify(newObjs, null, 2));
            } else {
                console.log("El id no existe");
            }
        }else{
            console.log("El archivo esta vacio");
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteAll() {
    const objs = await getAll();
    let newObjs = [];
    
    try {
        await fs.writeFile(ruta, JSON.stringify(newObjs, null, 2));
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    // console.log(await getAll());
    // console.log(await save({
    //     "producto": "Monitor",
    //     "precio": 300
    // }));
    // console.log(await getById(4));
    // console.log(await deleteById(2));
    // console.log(await deleteAll());
}

main();