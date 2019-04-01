<?php
    include 'inc/funciones/sesiones.php'; 
    include 'inc/funciones/administrar_solicitudes.php';   
    include 'inc/templates/header.php';       
    include 'inc/templates/barra.php';
?>

<div class="contenedor solicitudes" id="lista-solicitudes">
    <h1>Solicitudes</h1>
    <?php
        $solicitudes = obtenerSolicitudes();
            if($solicitudes){
                foreach($solicitudes as $solicitud){?>
                <div class="solicitud">
                    <div>
                        <p>Usuario: <?php echo $solicitud['usuario'] ?></p>
                    </div>
                    <div>
                        <p>Correo: <?php echo $solicitud['correo'] ?></p>
                    </div>
                    <div>
                        <p>Tipo de Usuario: <?php if($solicitud['tipo']==0){
                                                        echo 'Worker';
                                            }else{ 
                                                echo 'Administrador';
                                            }  ?></p>
                    </div>
                    <div>
                    <button data-id="<?php echo $solicitud['id']; ?>" type="button" class="btn-borrar btn">
                        <i class="fas fa-user-times"></i>
                    </button>
                    <button data-id="<?php echo $solicitud['id']; ?>" type="button" class="btn-aceptar btn">
                        <i class="fas fa-user-check"></i>
                    </button>
                        
                    </div>
                </div>
                <?php } 
            }
    ?>

</div>

<?php
    include 'inc/templates/footer.php';
?>