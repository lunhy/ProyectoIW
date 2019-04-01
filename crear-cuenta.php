<?php
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php'
?>
    <div class="contenedor-formulario">
        <h1>Crear Cuenta</h1>
        <form id="formulario" class=" caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario" autocomplete="off">
            </div>
            <div class="campo">
                <label for="correo">Correo: </label>
                <input type="email" name="correo" id="correo" placeholder="Correo" autocomplete="off">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password" autocomplete="off">
            </div>
            <div class="campo usuario">
                <label for="tipoUsuario">Lider de Proyecto: </label>
                <label class="switch"> 
                    <input type="checkbox" name="tipoUsuario" id="tipoUsuario" value="1">   
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton" value="Crear cuenta">
            </div>
            <div class="campo">
                <a href="login.php">Inicia Sesión Aquí</a>
            </div>
        </form>
    </div>

<?php
    include 'inc/templates/footer.php';
?>