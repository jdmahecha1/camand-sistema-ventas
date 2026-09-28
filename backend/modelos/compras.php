<?php

class Compras
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT c.*, p.nombre AS proveedor
                FROM compras c
                INNER JOIN proovedor p ON c.fo_proveedor = p.id_proveedor";

        $res = mysqli_query($this->conexion, $sql);

        $vec = [];
        while($row = mysqli_fetch_array($res))
        {
            $vec[] = $row;
        }

        return $vec;
    }

    public function insertar($params)
    {
        $sql = "INSERT INTO compras(fecha,total,fo_proveedor)
                VALUES(
                '$params->fecha',
                $params->total,
                $params->fo_proveedor
                )";

        mysqli_query($this->conexion,$sql);

        $vec['resultado']="OK";
        $vec['mensaje']="Compra registrada";

        return $vec;
    }
}

?>