import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { ClienteService } from '../../servicios/cliente.service';
import { VentasService } from '../../servicios/ventas.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totalProductos = 0;
  totalClientes = 0;
  totalPedidos = 0;
  totalUsuarios = 0;
  totalVentas = 0;
  ultimosPedidos: any[] = [];

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private ventasService: VentasService,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productoService.consultar().subscribe((res: any) => {
      this.totalProductos = res.length;
      this.cdr.detectChanges();
    });

    this.clienteService.consultar().subscribe((res: any) => {
      this.totalClientes = res.length;
      this.cdr.detectChanges();
    });

    this.usuarioService.consultar().subscribe((res: any) => {
      this.totalUsuarios = res.length;
      this.cdr.detectChanges();
    });

    this.ventasService.consultar().subscribe((res: any) => {
      this.totalPedidos = res.length;
      this.totalVentas = res.reduce((acumulado: number, item: any) => acumulado + Number(item.total), 0);
      this.ultimosPedidos = res.slice(0, 5);
      this.cdr.detectChanges();
    });
  }
}
