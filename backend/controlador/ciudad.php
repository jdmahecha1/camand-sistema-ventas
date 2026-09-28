<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/ciudad.php');

    $control = $_GET['control'];
    $ciudad = new Ciudad($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $ciudad->consulta();
    break;
    case 'consulta2':
        $id_dpto = $_GET['id_dpto'];
        $vec = $ciudad->consulta2($id_dpto);
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $ciudad->insertar($params);

    break;
    case 'editar':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $ciudad->editar($id,$params);
    break;
    case 'eliminar':
        $id = $_GET['id'];

        $vec = $ciudad->eliminar($id);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
