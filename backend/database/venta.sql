-- ============================================================
-- Base de datos "venta" - Sistema CAMAND
-- Script de creación completo (estructura + datos de ejemplo)
-- ============================================================

CREATE DATABASE IF NOT EXISTS venta CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE venta;

-- ---------------- dpto ----------------
CREATE TABLE dpto (
  id_dpto INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_dpto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- ciudad ----------------
CREATE TABLE ciudad (
  id_ciudad INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  fo_dpto INT(11) NOT NULL,
  PRIMARY KEY (id_ciudad),
  KEY fo_dpto (fo_dpto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- categoria ----------------
CREATE TABLE categoria (
  id_categoria INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(150) NOT NULL,
  PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- proovedor ----------------
CREATE TABLE proovedor (
  id_proveedor INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(150) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  fo_ciudad INT(11) DEFAULT NULL,
  PRIMARY KEY (id_proveedor),
  KEY fo_ciudad (fo_ciudad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- cliente ----------------
CREATE TABLE cliente (
  id_cliente INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  direccion VARCHAR(150) NOT NULL,
  fo_ciudad INT(11) NOT NULL,
  PRIMARY KEY (id_cliente),
  KEY fo_ciudad (fo_ciudad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- producto ----------------
CREATE TABLE producto (
  id_producto INT(11) NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(150) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  imagen VARCHAR(255) DEFAULT NULL,
  fo_categoria INT(11) NOT NULL,
  precio_compra DOUBLE NOT NULL,
  precio_venta DOUBLE NOT NULL,
  stock DOUBLE NOT NULL,
  fo_proveedor INT(11) NOT NULL,
  PRIMARY KEY (id_producto),
  KEY fo_categoria (fo_categoria),
  KEY fo_proveedor (fo_proveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- usuario ----------------
CREATE TABLE usuario (
  idusuario INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  clave VARCHAR(100) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'cliente',
  fo_cliente INT(11) DEFAULT NULL,
  PRIMARY KEY (idusuario),
  KEY fo_cliente (fo_cliente)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- ventas ----------------
CREATE TABLE ventas (
  id_venta INT(11) NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  fo_cliente INT(11) NOT NULL,
  productos TEXT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fo_vendedor INT(11) NOT NULL,
  PRIMARY KEY (id_venta),
  KEY fo_cliente (fo_cliente),
  KEY fo_vendedor (fo_vendedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------- compras ----------------
CREATE TABLE compras (
  id_compra INT(11) NOT NULL AUTO_INCREMENT,
  fecha DATE NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fo_proveedor INT(11) NOT NULL,
  PRIMARY KEY (id_compra),
  KEY fo_proveedor (fo_proveedor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATOS DE EJEMPLO
-- ============================================================

INSERT INTO dpto (nombre) VALUES
('Amazonas'),('Antioquia'),('Arauca'),('Atlántico'),('Bolívar'),('Boyacá'),
('Caldas'),('Caquetá'),('Casanare'),('Cauca'),('Cesar'),('Chocó'),
('Córdoba'),('Cundinamarca'),('Guainía'),('Guaviare'),('Huila'),('La Guajira'),
('Magdalena'),('Meta'),('Nariño'),('Norte de Santander'),('Putumayo'),('Quindío'),
('Risaralda'),('San Andrés y Providencia'),('Santander'),('Sucre'),('Tolima'),
('Valle del Cauca'),('Vaupés'),('Vichada');

INSERT INTO ciudad (nombre, fo_dpto) VALUES
('Leticia',1),
('Medellín',2),('Bello',2),('Envigado',2),('Itagüí',2),('Apartadó',2),
('Arauca',3),
('Barranquilla',4),('Malambo',4),('Puerto Colombia',4),('Soledad',4),
('Cartagena',5),('Magangué',5),('Turbaco',5),
('Tunja',6),('Duitama',6),('Sogamoso',6),('Chiquinquirá',6),
('Manizales',7),
('Florencia',8),
('Yopal',9),
('Popayán',10),
('Valledupar',11),
('Quibdó',12),
('Montería',13),
('Bogotá',14),('Chía',14),('Facatativá',14),('Soacha',14),('Zipaquirá',14),
('Inírida',15),
('San José del Guaviare',16),
('Neiva',17),
('Riohacha',18),
('Santa Marta',19),
('Villavicencio',20),
('Pasto',21),('Ipiales',21),
('Cúcuta',22),('Ocaña',22),
('Mocoa',23),
('Armenia',24),
('Pereira',25),('Dosquebradas',25),
('San Andrés',26),
('Bucaramanga',27),('Floridablanca',27),('Girón',27),('Piedecuesta',27),
('Sincelejo',28),
('Ibagué',29),
('Cali',30),('Buenaventura',30),('Cartago',30),('Palmira',30),('Tuluá',30),
('Mitú',31),
('Puerto Carreño',32);

INSERT INTO categoria (nombre) VALUES
('Carnicos'),
('Panaderia');

-- id_ciudad 15 = Tunja, 16 = Duitama
INSERT INTO proovedor (nombre, telefono, direccion, email, fo_ciudad) VALUES
('Distribuidora SAS', '3112223344', 'Zona Industrial 1', 'contacto@distribuidorasas.com', 15),
('Proveedor ABC', '3117778899', 'Zona Industrial 2', 'ventas@proveedorabc.com', 16);

INSERT INTO cliente (nombre, apellido, telefono, direccion, fo_ciudad) VALUES
('Juan', 'Pérez', '3101234567', 'Barrio Centro', 15),
('María', 'Gómez', '3119876543', 'Calle 10 #15-20', 16),
('Carlos', 'Rodríguez', '3204567890', 'Carrera 5 #8-12', 17),
('Ana', 'Martínez', '3157891234', 'Barrio El Carmen', 15),
('Luis', 'Torres', '3006543210', 'Calle Principal', 16);

INSERT INTO producto (codigo, nombre, imagen, fo_categoria, precio_compra, precio_venta, stock, fo_proveedor) VALUES
('P001', 'Pechuga a granel', NULL, 1, 12, 14.4, 5, 1),
('P002', 'Chorizo Ranchero', NULL, 1, 9, 10.8, 9, 1),
('P003', 'Salchicha americana', NULL, 1, 15.5, 16.5, 3, 1),
('P004', 'Pan Hamburguesa', NULL, 2, 8, 10, 6, 2),
('P005', 'Pan Hojaldrado', NULL, 2, 4.5, 6, 12, 2),
('P006', 'Tostada Natural', NULL, 2, 7, 8.5, 24, 2);

-- clave en texto plano (mismo esquema original) - cambiar en producción
INSERT INTO usuario (nombre, correo, clave, rol, fo_cliente) VALUES
('JUAN DIEGO MAHECHA MARTINEZ', 'admin@gmail.com', '12345', 'admin', NULL),
('Admin', 'admin2@gmail.com', '12345', 'cliente', NULL);

INSERT INTO ventas (fecha, fo_cliente, productos, subtotal, total, fo_vendedor) VALUES
('2026-08-12', 1, 'Pechuga a granel', 72.00, 72.00, 1),
('2026-08-12', 1, 'Chorizo Ranchero', 97.20, 97.20, 1),
('2026-08-12', 2, 'Pan Hamburguesa', 60.00, 60.00, 2),
('2026-08-12', 2, 'Pan Hojaldrado', 72.00, 72.00, 2),
('2026-08-12', 1, 'Tostada Natural', 204.00, 204.00, 2);
