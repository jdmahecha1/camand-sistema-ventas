<?php

class Producto
{  //atributos
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }
    //metodos 

    public function consulta()
    {
        $sql = "SELECT p. *, pr.nombre AS proovedor , c.nombre AS categoria FROM producto P
                INNER JOIN proovedor pr ON p.fo_proveedor = pr.id_proveedor
                INNER JOIN categoria c ON p.fo_categoria = c.id_categoria
                ORDER BY p.nombre";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla producto');


        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;

    }


    public function eliminar($id)
    {
        $sql = "DELETE FROM producto WHERE id_producto = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimio el registro";

        return ($vec);

    }

    public function insertar($params)
    {
        $imagen = isset($params->imagen) ? mysqli_real_escape_string($this->conexion, $params->imagen) : '';

        $sql = "INSERT INTO producto(codigo, nombre, imagen, fo_categoria, precio_compra, precio_venta, stock, fo_proveedor)
                VALUES('$params->codigo', '$params->nombre', '$imagen', $params->fo_categoria, $params->precio_compra, $params->precio_venta, $params->stock, $params->fo_proveedor)";

        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se inserto el registro";
        return ($vec);

    }
    public function editar($id, $params)
    {
        $imagen = isset($params->imagen) ? mysqli_real_escape_string($this->conexion, $params->imagen) : '';

        $sql = "UPDATE producto SET codigo = '$params->codigo', nombre = '$params->nombre', imagen = '$imagen', fo_categoria = $params->fo_categoria, precio_compra = $params->precio_compra, precio_venta = $params->precio_venta, stock = $params->stock, fo_proveedor = $params->fo_proveedor
        WHERE  id_producto = $id";
        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se edito el registro";
        return ($vec);

    }

}


?>