import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { SesionService } from '../../servicios/sesion.service';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit {
  usuarios: any[] = [];
  mostrarForm = false;
  modoEditar = false;
  idSeleccionado: any = null;

  nombre = '';
  correo = '';
  clave = '';
  rol = 'cliente';

  constructor(
    private usuarioService: UsuarioService,
    private sesion: SesionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.consultar();
  }

  get miPropioId(): any {
    return this.sesion.obtener()?.idusuario;
  }

  consultar(): void {
    this.usuarioService.consultar().subscribe((res: any) => {
      this.usuarios = res;
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
    this.idSeleccionado = item.idusuario;
    this.nombre = item.nombre;
    this.correo = item.correo;
    this.clave = item.clave;
    this.rol = item.rol || 'cliente';
    this.mostrarForm = true;
    this.modoEditar = true;
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (this.nombre.trim() === '' || this.correo.trim() === '' || this.clave.trim() === '') {
      alert('Complete todos los campos obligatorios');
      return;
    }

    const datos = {
      nombre: this.nombre,
      correo: this.correo,
      clave: this.clave,
      rol: this.rol,
    };

    if (this.modoEditar) {
      this.usuarioService.editar(this.idSeleccionado, datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    } else {
      this.usuarioService.insertar(datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    }
  }

  eliminar(item: any): void {
    if (confirm(`¿Eliminar el usuario "${item.nombre}"?`)) {
      this.usuarioService.eliminar(item.idusuario).subscribe(() => {
        this.consultar();
      });
    }
  }

  cancelar(): void {
    this.limpiar();
  }

  limpiar(): void {
    this.nombre = '';
    this.correo = '';
    this.clave = '';
    this.rol = 'cliente';
    this.idSeleccionado = null;
    this.mostrarForm = false;
    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}
