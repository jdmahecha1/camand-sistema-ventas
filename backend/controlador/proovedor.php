<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/proovedor.php');

    $control = $_GET['control'];
    $proovedor = new Proovedor($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $proovedor->consulta();
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $proovedor->insertar($params);

    break;
    case 'editar':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $proovedor->editar($id,$params);
    break;
    case 'eliminar':
        $id = $_GET['id'];

        $vec = $proovedor->eliminar($id);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
