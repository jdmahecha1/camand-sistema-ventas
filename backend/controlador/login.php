<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/login.php');

    $control = $_GET['control'];
    $login = new Login($conexion);

    switch ($control) {
    case 'consulta':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $login->consulta($params->correo, $params->clave);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
