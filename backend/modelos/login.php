<?php

class Login
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta($correo, $clave)
    {
        $correo = mysqli_real_escape_string($this->conexion, $correo);
        $clave = mysqli_real_escape_string($this->conexion, $clave);

        $sql = "SELECT idusuario, nombre, correo, rol, fo_cliente FROM usuario WHERE correo = '$correo' AND clave = '$clave'";
        $res = mysqli_query($this->conexion, $sql) or die('No se pudo validar el usuario');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }
        return $vec;
    }
}

?>
