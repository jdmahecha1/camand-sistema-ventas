import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { ClienteService } from '../../servicios/cliente.service';
import { VentasService } from '../../servicios/ventas.service';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-pedido',
  standalone: false,
  templateUrl: './pedido.html',
  styleUrl: './pedido.css',
})
export class Pedido implements OnInit {
  productos: any[] = [];
  clientes: any[] = [];
  ventas: any[] = [];

  fo_cliente: any = '';
  carrito: any[] = [];

  mostrarForm = false;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private ventasService: VentasService,
    private sesion: SesionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.consultarVentas();
    this.productoService.consultar().subscribe((res: any) => {
      this.productos = res.map((p: any) => ({ ...p, cantidadSeleccionada: 1 }));
      this.cdr.detectChanges();
    });
    this.clienteService.consultar().subscribe((res: any) => {
      this.clientes = res;
      this.cdr.detectChanges();
    });
  }

  consultarVentas(): void {
    this.ventasService.consultar().subscribe((res: any) => {
      this.ventas = res.map((v: any) => ({ ...v, productosDetalle: this.parsearProductos(v.productos) }));
      this.cdr.detectChanges();
    });
  }

  parsearProductos(valor: string): any[] {
    try {
      const datos = JSON.parse(valor);
      return Array.isArray(datos) ? datos : [{ nombre: valor, cantidad: 1 }];
    } catch {
      return [{ nombre: valor, cantidad: 1 }];
    }
  }

  nuevaVenta(): void {
    this.carrito = [];
    this.fo_cliente = '';
    this.mostrarForm = true;
    this.cdr.detectChanges();
  }

  agregar(producto: any): void {
    const cantidad = Number(producto.cantidadSeleccionada) || 1;
    if (cantidad <= 0) {
      alert('Cantidad no válida');
      return;
    }

    const existente = this.carrito.find((i) => i.id_producto === producto.id_producto);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.cantidad * existente.precio;
    } else {
      this.carrito.push({
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio: Number(producto.precio_venta),
        cantidad: cantidad,
        subtotal: cantidad * Number(producto.precio_venta),
      });
    }
    this.cdr.detectChanges();
  }

  quitar(item: any): void {
    this.carrito = this.carrito.filter((i) => i !== item);
    this.cdr.detectChanges();
  }

  get total(): number {
    return this.carrito.reduce((acumulado, item) => acumulado + item.subtotal, 0);
  }

  guardarVenta(): void {
    if (!this.fo_cliente) {
      alert('Seleccione un cliente');
      return;
    }
    if (this.carrito.length === 0) {
      alert('Agregue al menos un producto');
      return;
    }

    const usuario = this.sesion.obtener();
    const hoy = new Date().toISOString().slice(0, 10);

    const datos = {
      fecha: hoy,
      fo_cliente: this.fo_cliente,
      productos: JSON.stringify(this.carrito),
      subtotal: this.total,
      total: this.total,
      fo_vendedor: usuario ? usuario.idusuario : 1,
    };

    this.ventasService.insertar(datos).subscribe(() => {
      this.consultarVentas();
      this.mostrarForm = false;
      this.carrito = [];
      this.fo_cliente = '';
      this.cdr.detectChanges();
    });
  }

  cancelar(): void {
    this.mostrarForm = false;
    this.carrito = [];
    this.fo_cliente = '';
    this.cdr.detectChanges();
  }

  eliminarVenta(item: any): void {
    if (confirm('¿Eliminar este pedido?')) {
      this.ventasService.eliminar(item.id_venta).subscribe(() => {
        this.consultarVentas();
      });
    }
  }
}
