import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { CategoriaService } from '../../servicios/categoria.service';
import { ProveedorService } from '../../servicios/proveedor.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];
  proveedores: any[] = [];

  mostrarForm = false;
  modoEditar = false;
  idSeleccionado: any = null;

  codigo = '';
  nombre = '';
  imagen = '';
  fo_categoria: any = '';
  precio_compra: any = '';
  precio_venta: any = '';
  stock: any = '';
  fo_proveedor: any = '';

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.consultar();
    this.categoriaService.consultar().subscribe((res: any) => {
      this.categorias = res;
      this.cdr.detectChanges();
    });
    this.proveedorService.consultar().subscribe((res: any) => {
      this.proveedores = res;
      this.cdr.detectChanges();
    });
  }

  consultar(): void {
    this.productoService.consultar().subscribe((res: any) => {
      this.productos = res;
      this.cdr.detectChanges();
    });
  }

  nuevo(): void {
    this.limpiar();
    this.mostrarForm = true;
    this.modoEditar = false;
    this.cdr.detectChanges();
  }

  seleccionar(item: any): void {
    this.idSeleccionado = item.id_producto;
    this.codigo = item.codigo;
    this.nombre = item.nombre;
    this.imagen = item.imagen || '';
    this.fo_categoria = item.fo_categoria;
    this.precio_compra = item.precio_compra;
    this.precio_venta = item.precio_venta;
    this.stock = item.stock;
    this.fo_proveedor = item.fo_proveedor;
    this.mostrarForm = true;
    this.modoEditar = true;
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (this.codigo.trim() === '' || this.nombre.trim() === '' || !this.fo_categoria || !this.fo_proveedor) {
      alert('Complete todos los campos obligatorios');
      return;
    }

    const datos = {
      codigo: this.codigo,
      nombre: this.nombre,
      imagen: this.imagen,
      fo_categoria: this.fo_categoria,
      precio_compra: this.precio_compra,
      precio_venta: this.precio_venta,
      stock: this.stock,
      fo_proveedor: this.fo_proveedor,
    };

    if (this.modoEditar) {
      this.productoService.editar(this.idSeleccionado, datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    } else {
      this.productoService.insertar(datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    }
  }

  stockBajo(item: any): boolean {
    return Number(item.stock) <= 5;
  }

  eliminar(item: any): void {
    if (confirm(`¿Eliminar el producto "${item.nombre}"?`)) {
      this.productoService.eliminar(item.id_producto).subscribe(() => {
        this.consultar();
      });
    }
  }

  cancelar(): void {
    this.limpiar();
  }

  limpiar(): void {
    this.codigo = '';
    this.nombre = '';
    this.imagen = '';
    this.fo_categoria = '';
    this.precio_compra = '';
    this.precio_venta = '';
    this.stock = '';
    this.fo_proveedor = '';
    this.idSeleccionado = null;
    this.mostrarForm = false;
    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}
