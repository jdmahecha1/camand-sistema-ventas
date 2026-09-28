<?php

class Cliente
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT c.*, ci.nombre AS ciudad
                FROM cliente c
                INNER JOIN ciudad ci ON c.fo_ciudad = ci.id_ciudad";

        $res = mysqli_query($this->conexion, $sql) or die('No se encontró la tabla cliente');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    public function insertar($params)
    {
        $sql = "INSERT INTO cliente(nombre, apellido, telefono, direccion, fo_ciudad)
                VALUES(
                '$params->nombre',
                '$params->apellido',
                '$params->telefono',
                '$params->direccion',
                $params->fo_ciudad
                )";

        mysqli_query($this->conexion, $sql) or die('No insertó el cliente');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Cliente registrado";
        $vec['id_cliente'] = mysqli_insert_id($this->conexion);

        return $vec;
    }

    public function editar($id, $params)
    {
        $sql = "UPDATE cliente SET
                nombre = '$params->nombre',
                apellido = '$params->apellido',
                telefono = '$params->telefono',
                direccion = '$params->direccion',
                fo_ciudad = $params->fo_ciudad
                WHERE id_cliente = $id";

        mysqli_query($this->conexion, $sql) or die('No editó el cliente');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Cliente actualizado";

        return $vec;
    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM cliente WHERE id_cliente = $id";
        mysqli_query($this->conexion, $sql) or die('No se eliminó el cliente');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Cliente eliminado";

        return $vec;
    }
}

?>