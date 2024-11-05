//Declaramos un array vacio
var data = []
//Cargamos los datos del localStorage en la pagina
var loadData = function(){
    data = JSON.parse(localStorage.getItem("data"))
    //si al momento de cargar la pagina el valor del array es null, podemos cambiar su contenido y vaciarlo
    if (data == null){
        data = []
    }
    //Para mostrar toda la informacion que tenemos actualmente guardada
    //Haremos un ciclo "for" e imprimiremos tags de HTML dentro de la pagina
    //Esto nos permitirá mostrar lo que ya tenemos y adicionalmente podremos 
    //Dar la opcion de borrar uno por uno en la misma tabla de datos
    //para esto primero nos posicionamos (sin sacar el valor) en la parte que queremos
    //Inyectar el codigo HTML
    var dataStored = document.getElementById("dataStored")
    //antes de cargar los datos, lo dejaremos vacio para que no se repitan registros
    dataStored.innerHTML = " "
    //iniciamos el ciclo "for" asigando la variable "position" para que aloje la posicion en el arreglo
    for (let position = 0; position < data.length; position++) {
        dataStored.innerHTML = dataStored.innerHTML + `<tr>
                                                        <td>${data[position].name}</td>
                                                        <td>${data[position].lastname}</td>
                                                        <td>${data[position].dOB}</td>
                                                        <td>${data[position].cedula}</td>
                                                        <td><button type="button" onclick="delete()">Eliminar</button></td>
                                                    </tr>`
    }
} 
//Declaramos la funcion save para despues llamarla en el documento HTML
var save = function(){
    //En este espacio capturamos los datos desde el HTML a JavaScript
    var name = document.getElementById("nombre").value
    var lastname = document.getElementById("apellido").value
    var dOB = document.getElementById("dOB").value
    var cedula = document.getElementById("cedula").value
    //Los datos capturados son guardados en un objeto con nombre person
    var person = {
        name : name,
        lastname : lastname,
        dOB : dOB,
        cedula : cedula
    }
    //creamos una variable para encontrar el index de un valor buscando por cedula
    var position = data.findIndex((item) => item.cedula == cedula)
    //Para que los registros no se repitan necesitamos comparar los valores
    //Cuando se usa la funcion findIndex se busca indice por indice si hay una coincidencia
    //Si NO la hay significa que es un registro nuevo y arrojará un valor de -1 
    //A lo que se insertará el valor dentro del locaStorage
    if(position == -1){
        data.push(person)
        //para insertar el valor dentro del localStorage y que no quede como objeto, debemos
        //Volver el valor una cadena caracteres y se usa la funcion "stringify"
        localStorage.setItem("data",JSON.stringify(data))
        alert("Registro Guardado Correctamente")
        //despues de guardar los datos para que se actualice la pagina
        //Ejecutamos la funcion "loadData" que nos permite cargar nevamente todos los registros
        loadData() 
    }
    if(position != -1){
        //Por el contrario si encuentra un registro y este valor es distinto a -1 es decir si hay coincidencias
        //El registro no se completará porque hay una coincidencia
        alert("Este Registro Ya Existe")
    }
    
}
//Esta funcion nos permite borrar todos los datos alojados en el localStorage
//Junto con los datos que tenemos en el array por nombre "data" 
var deleteData = function(){
    data = []
    localStorage.removeItem("data")
}
//Si quieremos eliminar un registro especifico, debemos establecer que variable o dato buscar
var searchDelete = function(){
    //Primero capturamos el dato en un input y lo alojamos en una variable
    var deleteCedula = document.getElementById("borrarCedula").value
    //Realizamos la busqueda con la funcion "findIndex" para que la posicion en la que encuentre
    //El numero de cedula quede en exa variable.
    var position = data.findIndex((item) => item.cedula == deleteCedula)
    if (position != -1) {
        //Usamos la funcion "splice" para eliminar el registro encontrado
        data.splice(position,1)
        //Actualizamos el localStorage ya habiendo eliminado el registro, NO antes
        localStorage.setItem("data",JSON.stringify(data))
        alert("El registro fue eliminado correctamente.")
    }
    if (position == -1) {
        alert("Esta cedula NO existe.")
    }
}
//Llamamos la funcion de cargar datos para siempre tener la pagina sincronizada
loadData()