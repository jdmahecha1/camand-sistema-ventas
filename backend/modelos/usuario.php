<?php

class Usuario
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function consulta()
    {
        $sql = "SELECT * FROM usuario";

        $res = mysqli_query($this->conexion, $sql) or die('No se encontro la tabla usuario');

        $vec = [];
        while ($row = mysqli_fetch_array($res)) {
            $vec[] = $row;
        }

        return $vec;
    }

    public function insertar($params)
    {
        $rol = isset($params->rol) && $params->rol !== '' ? $params->rol : 'cliente';

        $sql = "INSERT INTO usuario(nombre,correo,clave,rol)
                VALUES(
                '$params->nombre',
                '$params->correo',
                '$params->clave',
                '$rol'
                )";

        mysqli_query($this->conexion, $sql) or die('No inserto el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Usuario registrado";

        return $vec;
    }

    public function editar($id, $params)
    {
        $rol = isset($params->rol) && $params->rol !== '' ? $params->rol : 'cliente';

        $sql = "UPDATE usuario SET
                nombre='$params->nombre',
                correo='$params->correo',
                clave='$params->clave',
                rol='$rol'
                WHERE idusuario=$id";

        mysqli_query($this->conexion, $sql) or die('No edito el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Usuario actualizado";

        return $vec;
    }

    public function eliminar($id)
    {
        $sql = "DELETE FROM usuario WHERE idusuario = $id";
        mysqli_query($this->conexion, $sql) or die('No se elimino el registro');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Usuario eliminado";

        return $vec;
    }

    public function vincularCliente($id, $id_cliente)
    {
        $id_cliente = (int) $id_cliente;
        $sql = "UPDATE usuario SET fo_cliente = $id_cliente WHERE idusuario = $id";
        mysqli_query($this->conexion, $sql) or die('No se vinculo el cliente');

        $vec['resultado'] = "OK";
        $vec['mensaje'] = "Perfil de cliente vinculado";

        return $vec;
    }
}

?>
