document.addEventListener("DOMContentLoaded",()=>{
    conexionDB();
})
let DB;
function conexionDB(){
    //Crear la bbdd en aplication indexedDB
    let conexionDB=window.indexedDB.open("restaurante");

    conexionDB.onerror=function(){
        console.log("Error al conectar con la base de datos");
    }

    conexionDB.onsuccess=function(){
            console.log("No se ha creado la bbdd");
            console.log(conexionDB.result);
            DB=conexionDB.result;
            
    }

    conexionDB.onupgradeneeded=function(e){
        const db=e.target.result;
        console.log(e.target.result);
        console.log("Este metodo se ejecuta solo una vez");

        const objectStore=db.createObjectStore('user',{
            keyPath:'user',
            autoIncrement:true
        });

        objectStore.createIndex('nombre','nombre',{unique:false});
        objectStore.createIndex('email','email',{unique:false});
        objectStore.createIndex('telefono','telefono',{unique:false});
    }
}

const pulsar=document.querySelector("#pulsar");
pulsar.addEventListener("click",function(){
    crearCliente();
})

function crearCliente(){
    let transaction=DB.transaction(["user"],"readwrite");

    transaction.oncomplete=function(){
        console.log("Transaccion completada");
    }
    transaction.onerror=function(){
        console.log("Transaccion erronea");
    }

    const objectStore=transaction.objectStore("user")

    const nuevoCliente={
        user:'Javier',
        nombre:'Javier',
        telefono:123456789,
        email:'javier.ruiz@gmail.com'
    }

    const peticion=objectStore.add(nuevoCliente)

}
