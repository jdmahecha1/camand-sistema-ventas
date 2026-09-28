<?php

class Ventas
{  //atributos
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }
    //metodos 

    public function consulta()
    {
        $sql = "SELECT v.*, c.nombre AS cliente, ve.nombre AS vendedor FROM ventas v
                INNER JOIN cliente c ON v.fo_cliente = c.id_cliente
                INNER JOIN usuario ve ON v.fo_vendedor = ve.idusuario 
                ORDER BY fecha DESC;";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla consulta');


        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;

    }


    public function consultaPorCliente($id_cliente)
    {
        $id_cliente = (int) $id_cliente;
        $sql = "SELECT v.*, c.nombre AS cliente, ve.nombre AS vendedor FROM ventas v
                INNER JOIN cliente c ON v.fo_cliente = c.id_cliente
                INNER JOIN usuario ve ON v.fo_vendedor = ve.idusuario
                WHERE v.fo_cliente = $id_cliente
                ORDER BY fecha DESC;";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla consulta');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }

    public function insertar($params)
    {

        $sql = "INSERT INTO ventas(fecha, fo_cliente, productos, subtotal, total, fo_vendedor)    
                VALUES('$params->fecha', $params->fo_cliente, '$params->productos', $params->subtotal, $params->total, $params->fo_vendedor)";

        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se inserto el registro";
        return ($vec);

    }
    public function editar($id, $params)
    {
        $sql = "UPDATE ventas SET fecha = '$params->fecha' , fo_cliente = $params->fo_cliente, productos = '$params->productos', subtotal = $params->subtotal, total = $params->total, fo_vendedor = $params->fo_vendedor
        WHERE  id_venta = $id";
        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se edito el registro";
        return ($vec);

    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM ventas WHERE id_venta = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimino el registro";
        return ($vec);

    }

}


?>