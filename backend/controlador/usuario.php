<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/usuario.php');

    $control = $_GET['control'];
    $usuario = new Usuario($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $usuario->consulta();
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $usuario->insertar($params);

    break;
    case 'editar':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $usuario->editar($id,$params);
    break;
    case 'eliminar':
        $id = $_GET['id'];

        $vec = $usuario->eliminar($id);
    break;
    case 'vincularCliente':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $usuario->vincularCliente($id, $params->fo_cliente);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
