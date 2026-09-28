import { Injectable } from '@angular/core';

const CLAVE_SESION = 'usuario';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  guardar(usuario: any): void {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
  }

  obtener(): any {
    const datos = localStorage.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  }

  actualizar(cambios: any): void {
    const actual = this.obtener() || {};
    this.guardar({ ...actual, ...cambios });
  }

  estaLogueado(): boolean {
    return this.obtener() !== null;
  }

  esAdmin(): boolean {
    return this.obtener()?.rol === 'admin';
  }

  rutaInicio(): string {
    return this.esAdmin() ? '/dashboard' : '/tienda';
  }

  cerrar(): void {
    localStorage.removeItem(CLAVE_SESION);
  }
}
