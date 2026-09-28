<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once('../modelos/conexion.php');
    require_once('../modelos/ventas.php');

    $control = $_GET['control'];
    $ventas = new Ventas($conexion);

    switch ($control) {
    case 'consulta':
        $vec = $ventas->consulta();
    break;
    case 'consultaPorCliente':
        $id_cliente = $_GET['id_cliente'];
        $vec = $ventas->consultaPorCliente($id_cliente);
    break;
    case 'insertar':
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        $vec = $ventas->insertar($params);

    break;
    case 'editar':
        $json = file_get_contents('php://input');
        $id = $_GET['id'];

        $params = json_decode($json);
        $vec = $ventas->editar($id,$params);
    break;
    case 'eliminar':
        $id = $_GET['id'];

        $vec = $ventas->eliminar($id);
    break;
    }


    header('Content-Type: application/json');
    $datos = json_encode ($vec);
    echo $datos;


?>
