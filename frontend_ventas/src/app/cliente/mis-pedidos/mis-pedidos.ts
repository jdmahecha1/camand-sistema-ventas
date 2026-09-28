import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-mis-pedidos',
  standalone: false,
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css',
})
export class MisPedidos implements OnInit {
  pedidos: any[] = [];
  cargando = true;

  constructor(
    private ventasService: VentasService,
    private sesion: SesionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const usuario = this.sesion.obtener();

    if (!usuario?.fo_cliente) {
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }

    this.ventasService.consultarPorCliente(usuario.fo_cliente).subscribe((res: any) => {
      this.pedidos = res.map((v: any) => ({ ...v, productosDetalle: this.parsearProductos(v.productos) }));
      this.cargando = false;
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
}
