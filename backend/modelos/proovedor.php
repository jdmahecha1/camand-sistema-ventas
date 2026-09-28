<?php

class Proovedor
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    // Consultar
    public function consulta()
    {
        $sql = "SELECT p.*, c.nombre AS ciudad
                FROM proovedor p
                INNER JOIN ciudad c ON p.fo_ciudad = c.id_ciudad";

        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla consulta');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    // Insertar
    public function insertar($params)
    {
        $sql = "INSERT INTO proovedor
                (nombre, telefono, direccion, email, fo_ciudad)
                VALUES
                (
                    '$params->nombre',
                    '$params->telefono',
                    '$params->direccion',
                    '$params->email',
                    $params->fo_ciudad
                )";

        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se inserto el registro";

        return $vec;
    }

    // Editar
    public function editar($id, $params)
    {
        $sql = "UPDATE proovedor SET
                nombre = '$params->nombre',
                telefono = '$params->telefono',
                direccion = '$params->direccion',
                email = '$params->email',
                fo_ciudad = $params->fo_ciudad
                WHERE id_proveedor = $id";

        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = 'Se edito el registro';

        return $vec;
    }

    // Eliminar
    public function eliminar($id)
    {
        $sql = "DELETE FROM proovedor WHERE id_proveedor = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimino el registro";

        return $vec;
    }
}

?>
