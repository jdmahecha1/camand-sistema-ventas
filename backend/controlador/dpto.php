<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/dpto.php');

    $control = $_GET['control'];
    $dpto = new Dpto($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $dpto->consulta();
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $dpto->insertar($params);

    break;
    case 'editar':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $dpto->editar($id,$params);
    break;
    case 'eliminar':
        $id = $_GET['id'];

        $vec = $dpto->eliminar($id);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
