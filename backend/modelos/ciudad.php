<?php
Class Ciudad {
        private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }
    //metodos 

    public function consulta()
    {
        $sql = "SELECT * FROM ciudad ORDER BY nombre";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla ciudad');


        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;

    }

    public function consulta2($id_dpto)
    {
        $sql = "SELECT * FROM ciudad WHERE fo_dpto = $id_dpto ORDER BY nombre";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla ciudad');


        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;

    }


    public function eliminar($id)
    {
        $sql = "DELETE FROM ciudad WHERE id_ciudad = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimio el registro";

        return ($vec);

    }

    public function insertar($params)
    {

        $sql = "INSERT INTO ciudad(nombre, fo_dpto) VALUES('$params->nombre', $params->dpto)";
        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimino el registro";
        return ($vec);

    }
    public function editar($id, $params)
    {
        $sql = "UPDATE ciudad SET nombre = '$params->nombre' , fo_dpto = $params->dpto WHERE id_ciudad = $id";
        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se edito el registro";
        return ($vec);

    }

}


?>