import { Component } from '@angular/core';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-aside',
  standalone: false,
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  constructor(private sesion: SesionService) {}

  get usuario(): any {
    return this.sesion.obtener();
  }
}
