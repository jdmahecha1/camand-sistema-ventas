import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService, ItemCarrito } from '../../servicios/carrito.service';
import { SesionService } from '../../servicios/sesion.service';
import { CiudadService } from '../../servicios/ciudad.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  ciudades: any[] = [];
  enviando = false;
  pedidoConfirmado = false;
  error: string | null = null;

  apellido = '';
  telefono = '';
  direccion = '';
  fo_ciudad: any = '';

  constructor(
    private carritoService: CarritoService,
    private sesion: SesionService,
    private ciudadService: CiudadService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private ventasService: VentasService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.necesitaPerfil) {
      this.ciudadService.consultar().subscribe((res: any) => {
        this.ciudades = res;
        this.cdr.detectChanges();
      });
    }
  }

  get items(): ItemCarrito[] {
    return this.carritoService.obtenerItems();
  }

  get total(): number {
    return this.carritoService.total;
  }

  get necesitaPerfil(): boolean {
    return !this.sesion.obtener()?.fo_cliente;
  }

  cambiarCantidad(item: ItemCarrito, cantidad: string): void {
    this.carritoService.actualizarCantidad(item, Number(cantidad));
    this.cdr.detectChanges();
  }

  quitar(item: ItemCarrito): void {
    this.carritoService.quitar(item);
    this.cdr.detectChanges();
  }

  confirmarPedido(): void {
    this.error = null;

    if (this.items.length === 0) {
      this.error = 'Tu carrito está vacío.';
      this.cdr.detectChanges();
      return;
    }

    if (this.necesitaPerfil) {
      if (!this.apellido.trim() || !this.telefono.trim() || !this.direccion.trim() || !this.fo_ciudad) {
        this.error = 'Completa tus datos de entrega para continuar.';
        this.cdr.detectChanges();
        return;
      }
    }

    this.enviando = true;
    this.cdr.detectChanges();

    if (this.necesitaPerfil) {
      const usuario = this.sesion.obtener();
      const datosCliente = {
        nombre: usuario.nombre,
        apellido: this.apellido,
        telefono: this.telefono,
        direccion: this.direccion,
        fo_ciudad: this.fo_ciudad,
      };

      this.clienteService.insertar(datosCliente).subscribe((res: any) => {
        const idCliente = res.id_cliente;
        this.usuarioService.vincularCliente(usuario.idusuario, idCliente).subscribe(() => {
          this.sesion.actualizar({ fo_cliente: idCliente });
          this.crearPedido(idCliente);
        });
      });
    } else {
      this.crearPedido(this.sesion.obtener().fo_cliente);
    }
  }

  private crearPedido(idCliente: any): void {
    const usuario = this.sesion.obtener();
    const hoy = new Date().toISOString().slice(0, 10);

    const datos = {
      fecha: hoy,
      fo_cliente: idCliente,
      productos: JSON.stringify(this.items),
      subtotal: this.total,
      total: this.total,
      fo_vendedor: usuario.idusuario,
    };

    this.ventasService.insertar(datos).subscribe(() => {
      this.carritoService.vaciar();
      this.enviando = false;
      this.pedidoConfirmado = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.router.navigate(['/mis-pedidos']);
      }, 1800);
    });
  }
}
