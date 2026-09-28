<?php

class Categoria
{  //atributos
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }
    //metodos 

    public function consulta()
    {
        $sql = "SELECT * FROM categoria ORDER BY nombre";
        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla categoria');


        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;

    }


    public function eliminar($id)
    {
        $sql = "DELETE FROM categoria WHERE id_categoria = $id";
        mysqli_query($this->conexion, $sql) or die('No elimino el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimio el registro";

        return ($vec);

    }

    public function insertar($params)
    {

        $sql = "INSERT INTO categoria(nombre) VALUES('$params->nombre')";
        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se elimino el registro";
        return ($vec);

    }
    public function editar($id, $params)
    {
        $sql = "UPDATE categoria SET nombre = '$params->nombre' WHERE id_categoria = $id";
        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec = [];
        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Se edito el registro";
        return ($vec);

    }

}


?>