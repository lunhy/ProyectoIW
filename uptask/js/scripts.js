eventListeners();

//lista de proyectos
var listaProyectos = document.querySelector('ul#proyectos');

function eventListeners(){
    //boton para crear proyecto
    document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

    //boton para una nueva tarea
    if(document.querySelector('.nueva-tarea') !== null){
        document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);
    }

    //Botones para las acciones de las tareas
    document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
}

function nuevoProyecto(e){
    e.preventDefault();
    // console.log('presionaste en nuevo proyecto');
    var listaProyectos = document.querySelector('ul#proyectos');
    //crea un input para el nombre del nuevo proyecto
    var nuevoProyecto = document.createElement('li');
    nuevoProyecto.innerHTML = '<input type="text" id="nuevo-proyecto">';
    listaProyectos.appendChild(nuevoProyecto);
    
    //seleccionar el ID con el nuevoProyecto
    var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

    //al presionar enter, crear el proyecto
    inputNuevoProyecto.addEventListener('keypress', function(e){
        var tecla = e.which || e.keyCode;

        if(tecla===13){
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(nuevoProyecto);
        }
    });
}

function guardarProyectoDB(nombreProyecto){
    //crear llamado a Ajax
    var xhr = new XMLHttpRequest();

    //enviar datos por formdata
    var datos = new FormData();
    datos.append('proyecto', nombreProyecto);
    datos.append('accion', 'crear');

    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

    //En la carga
    xhr.onload = function() {
        if(this.status === 200){
            //obtener datos de la respuesta
            var respuesta = JSON.parse(xhr.responseText);
            var proyecto = respuesta.nombre_proyecto,
                id_proyeccto = respuesta.id_insertado,
                tipo = respuesta.tipo,
                resultado = respuesta.respuesta;

            //comprobar la insersion
            if(resultado === 'correcto'){
                //fue exitoso
                if(tipo === 'crear'){
                    //se creo un nuevo proyecto
                    //inyectar en el html
                    var nuevoProyecto = document.createElement('li');
                    nuevoProyecto.innerHTML = `
                        <a href="index.php?id_proyecto=${id_proyeccto} id="proyecto:${id_proyeccto}">
                            ${proyecto}
                        </a>
                    `;
                    //agregar al html
                    listaProyectos.appendChild(nuevoProyecto);

                    //enviar alerta
                    swal({
                        title: 'Proyecto Creado',
                        text : 'El proyecto: '+ proyecto +' se creó correctamente',
                        type: 'success'
                    })
                    .then(resultado => {
                        //redireccionar a la nueva URL
                        if(resultado.value){
                            window.location.href = 'index.php?id_proyecto='+id_proyeccto;
                        }    
                    });
                }
                else{
                    //se actualizo o se elimino

                }
            }
            else{
                //hubo un error
                swal({
                    type: 'error',
                    title: '¡Error!',
                    text: '¡Hubo un error!'
                });
            }
        }
    }

    //enviar el request
    xhr.send(datos);
}

//agregar una tarea al proyecto actual
function agregarTarea(e){
    e.preventDefault();

    var nombreTarea = document.querySelector('.nombre-tarea').value;

    //Validar que el campo tenga algo
    if(nombreTarea === ''){
        swal({
            type: 'error',
            title: '¡Error!',
            text: '¡Una tarea no puede ir vacia!'
        });
    }
    else{
        //la tarea existe, insertar PHP

        //crear llamado a ajx
        var xhr = new XMLHttpRequest();

        //crear formdata
        var datos = new FormData();
        datos.append('tarea', nombreTarea);
        datos.append('accion', 'crear');
        datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

        //abrir la conexion
        xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

        //ejecutarlo y respuesta
        xhr.onload = function() {
            if(this.status === 200) {
                //todo correcto
                var respuesta = JSON.parse(xhr.responseText);
                //asignar valores
                var resultado = respuesta.respuesta,
                    tarea = respuesta.tarea,
                    id_insertado = respuesta.id_insertado,
                    tipo = respuesta.tipo;

                if(resultado === 'correcto'){
                    //se agrego correctamente
                    if(tipo === 'crear'){
                        swal({
                            title: 'Tarea Creada',
                            text : 'La tarea: '+ tarea + ' se creo correctamente',
                            type: 'success'
                        });

                        //seleccionar tareas vacias
                        var tareaVacia = document.querySelectorAll('.lista-vacia');
                        if(tareaVacia.length > 0){
                            document.querySelector('.lista-vacia').remove();
                        }
                        //construir el template
                        var nuevaTarea = document.createElement('li');
                        
                        //agregamos el ID
                        nuevaTarea.id = 'tarea:'+id_insertado;

                        //agregamos la clase tarea
                        nuevaTarea.classList.add('tarea');

                        //construir en el html
                        nuevaTarea.innerHTML = `
                            <p>${tarea}</p>
                            <div class="acciones">
                                <i class="far fa-check-circle"></i>
                                <i class="fas fa-trash"></i>
                            </div>                        
                        `;

                        //agregarlo al html
                        var listado = document.querySelector('.listado-pendientes ul');
                        listado.appendChild(nuevaTarea);

                        //lismpiar el formulario
                        document.querySelector('.agregar-tarea').reset();
                    }
                }
                else{
                    //hubo un error
                    swal({
                        type: 'error',
                        title: '¡Error!',
                        text: '¡Hubo un error!'
                    });
                }
                
            }
        }

        //enviar la consulta
        xhr.send(datos);
    }
}

//Cambia el estado de las tareas o las elimina
function accionesTareas(e){
    e.preventDefault();
    
    if(e.target.classList.contains('fa-check-circle')) {
        if(e.target.classList.contains('completo')){
            e.target.classList.remove('completo');
            cambiarEstadoTarea(e.target, 0);
        }
        else {
            e.target.classList.add('completo');
            cambiarEstadoTarea(e.target, 1);
        }
    }

    if(e.target.classList.contains('fa-trash')) {
        Swal({
            title: 'Estas Seguro(a)?',
            text: "¡Esta acción no se puede deshacer!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, borrar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                var tareaEliminar = e.target.parentElement.parentElement;
                //borrar de la base de datos
                eliminarTareaBD(tareaEliminar);
                //borrar del html
                tareaEliminar.remove();
              Swal(
                '¡Eliminado!',
                '¡La tarea fue eliminada!',
                'success'
              )
            }
          })       
    }
}

//Completa o descompleta uan tarea
function cambiarEstadoTarea(tarea, estado){
    var idTarea = tarea.parentElement.parentElement.id.split(':');
    
    //Crear llamado a Ajax
    var xhr = new XMLHttpRequest();

    //informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'actualizar');
    datos.append('estado', estado);

    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    //onload
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }
    //enviar la peticion
    xhr.send(datos);
}

//Elimina las tareas de la base de datos
function eliminarTareaBD(tarea){
    var idTarea = tarea.id.split(':');
    
    //Crear llamado a Ajax
    var xhr = new XMLHttpRequest();

    //informacion
    var datos = new FormData();
    datos.append('id', idTarea[1]);
    datos.append('accion', 'eliminar');

    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

    //onload
    xhr.onload = function(){
        if(this.status === 200){
            console.log(JSON.parse(xhr.responseText));
            //comprobar que haya tareas restantes
            var listaTareasRestantes = document.querySelectorAll('li .tarea');
            if(listaTareasRestantes.length === 0){
                document.querySelector('.listado-pendientes ul').innerHTML = "<h2 class='lista-vacia'>No hay tareas en este proyecto</h2>";
            }
        }
    }

    //enviar la peticion
    xhr.send(datos);

}

