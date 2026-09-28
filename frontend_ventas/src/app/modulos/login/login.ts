import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  clave = '';
  error = false;
  cargando = false;

  constructor(
    private loginService: LoginService,
    private sesion: SesionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ingresar(): void {
    this.error = false;

    if (this.correo === '' || this.clave === '') {
      this.error = true;
      return;
    }

    this.cargando = true;

    this.loginService.consultar(this.correo, this.clave).subscribe({
      next: (resultado: any) => {
        this.cargando = false;
        if (resultado && resultado.length > 0) {
          this.sesion.guardar(resultado[0]);
          this.router.navigate([this.sesion.rutaInicio()]);
        } else {
          this.error = true;
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.cargando = false;
        this.error = true;
        this.cdr.detectChanges();
      },
    });
  }
}
