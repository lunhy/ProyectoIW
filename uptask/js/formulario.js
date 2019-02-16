eventListener();

function eventListener(){
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}

function validarRegistro(e){
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo= document.querySelector('#tipo').value;

        if(usuario === '' || password === ''){
            // la validacion fallo
            Swal({
                type: 'error',
                title: 'Error',
                text: '¡Ambos campos son obligatorios!'
              });
        }
        else{
            // Ambos campos son correctos, mandar ejecutar Ajax

            //Datos que se envian al serividor
            var datos = new FormData();
            datos.append('usuario', usuario);
            datos.append('password', password);
            datos.append('accion', tipo);

            // Llamado a Ajax

            //crear el llmado a Ajax
            var xhr = new XMLHttpRequest();

            // abrir la conexion
            xhr.open('POST', 'inc/modelos/modelo-admin.php', true);

            // retorno de datos
            xhr.onload = function(){
                if(this.status === 200){
                    var respuesta = JSON.parse(xhr.responseText);
                    
                    //Si la respuesta es correcta
                    if(respuesta.respuesta === 'correcto'){
                        //si es un nuevo usuario
                        if(respuesta.tipo === 'crear'){
                            Swal({
                                type: 'success',
                                title: 'Usuario Creado',
                                text: '¡El usuario se creó correctamente!'
                            });
                        }
                        else if(respuesta.tipo === 'login'){
                            swal({
                                type: 'success',
                                title: 'Login Correcto',
                                text: '¡Presiona OK para abrir el dashboard!'
                            })
                            .then(resultado => {
                                if(resultado.value){
                                    window.location.href = 'index.php';
                                }
                            })
                        }
                    }
                    else{
                        //hubo un error
                        Swal({
                            type: 'error',
                            title: 'Error',
                            text: '¡Hubo un error!'
                          });
                    }
                }
            }

            //enviar la peticion
            xhr.send(datos);
        }
}