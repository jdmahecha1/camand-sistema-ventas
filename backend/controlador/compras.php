<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/compras.php');

    $control = $_GET['control'];
    $compras = new Compras($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $compras->consulta();
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $compras->insertar($params);

    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
