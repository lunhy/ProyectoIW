<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
    
$id_proyecto = '';
    // Obtener el ID de la URL
    if(isset($_GET['id_proyecto'])) {
        $id_proyecto = $_GET['id_proyecto'];
    }
?>

<div class="contenedor">
    <?php
        include 'inc/templates/sidebar.php';
    ?>

    <main class="contenido-principal">
        
    <?php 
        $proyecto = obtenerdatosProyecto($id_proyecto);
        
        if($proyecto): ?>
        
        <h1>Proyecto Actual: 
                    <?php foreach($proyecto as $p): ?>
                        <span><?php echo $p['nombre']; ?></span>
                        <div class="desP">
                            <p><?php echo $p['descripcion'];?></p>
                        </div>
                    <?php endforeach;?>
        </h1>

        <form action="#" class="agregar-tarea">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
            </div>
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div>
        </form>
        
        <?php
            else:
                // Si no hay proyectos seleccionados
                echo "<h2>Selecciona un Proyecto a la izquierda</h2>";
            endif;
        
        ?>
        <h2>Listado de tareas:</h2>

        <div class="listado-pendientes">
            <ul>
                <?php 
                    //si esta seleccionado un protecto muestra las tareas
                    if($proyecto){
                        // obtiene las tareas del proyecto actual
                        $tareas = obtenerTareasProyecto($id_proyecto);
                        
                        if($tareas->num_rows > 0) {
                            // si hay tareas
                            foreach($tareas as $tarea): ?>
                                <li id="tarea:<?php echo $tarea['id'] ?>" class="tarea">
                                <p><?php echo $tarea['nombre'] ?></p>
                                    <div class="acciones">
                                        <i class="far fa-check-circle <?php echo ($tarea['estado'] === '1' ? 'completo' : '') ?>"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </li>  
                                
                        <?php endforeach;
                        
                        }
                        else {
                            // no hay tareas
                            echo "<h2 class='lista-vacia'>No hay tareas en este proyecto</h2>";
                        }
                    }
                    else {
                        // no proyecto selecionado
                        echo "<h2 class='lista-vacia'>Selecciona un proyecto para mostrar sus tareas</h2>";
                    }
                ?>

            </ul>
        </div>
    </main>
</div><!--.contenedor-->

<?php
    include 'inc/templates/footer.php';
?>