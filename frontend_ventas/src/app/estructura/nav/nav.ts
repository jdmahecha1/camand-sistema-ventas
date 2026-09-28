import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  constructor(private sesion: SesionService, private router: Router) {}

  get usuario(): any {
    return this.sesion.obtener();
  }

  cerrarSesion(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}
