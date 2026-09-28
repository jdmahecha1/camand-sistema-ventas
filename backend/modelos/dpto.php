<?php

class Dpto
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT * FROM dpto";

        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla dpto');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    public function insertar($params)
    {
        $sql = "INSERT INTO dpto(nombre)
                VALUES('$params->nombre')";

        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Departamento registrado";

        return $vec;
    }

    public function editar($id, $params)
    {
        $sql = "UPDATE dpto
                SET nombre='$params->nombre'
                WHERE id_dpto=$id";

        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Departamento actualizado";

        return $vec;
    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM dpto WHERE id_dpto = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Departamento eliminado";

        return $vec;
    }
}

?>