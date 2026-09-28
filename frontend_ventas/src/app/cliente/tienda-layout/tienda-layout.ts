import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../servicios/sesion.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-tienda-layout',
  standalone: false,
  templateUrl: './tienda-layout.html',
  styleUrl: './tienda-layout.css',
})
export class TiendaLayout implements OnInit {
  itemsCarrito = 0;

  constructor(
    private sesion: SesionService,
    private carrito: CarritoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carrito.cambios$.subscribe(() => {
      this.itemsCarrito = this.carrito.totalItems;
      this.cdr.detectChanges();
    });
  }

  get usuario(): any {
    return this.sesion.obtener();
  }

  cerrarSesion(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}
