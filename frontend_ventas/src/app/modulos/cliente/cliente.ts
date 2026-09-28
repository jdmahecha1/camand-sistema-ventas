import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements OnInit {
  clientes: any[] = [];
  ciudades: any[] = [];

  mostrarForm = false;
  modoEditar = false;
  idSeleccionado: any = null;

  nombre = '';
  apellido = '';
  telefono = '';
  direccion = '';
  fo_ciudad: any = '';

  constructor(
    private clienteService: ClienteService,
    private ciudadService: CiudadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.consultar();
    this.ciudadService.consultar().subscribe((res: any) => {
      this.ciudades = res;
      this.cdr.detectChanges();
    });
  }

  consultar(): void {
    this.clienteService.consultar().subscribe((res: any) => {
      this.clientes = res;
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
    this.idSeleccionado = item.id_cliente;
    this.nombre = item.nombre;
    this.apellido = item.apellido;
    this.telefono = item.telefono;
    this.direccion = item.direccion;
    this.fo_ciudad = item.fo_ciudad;
    this.mostrarForm = true;
    this.modoEditar = true;
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (this.nombre.trim() === '' || this.apellido.trim() === '' || !this.fo_ciudad) {
      alert('Complete todos los campos obligatorios');
      return;
    }

    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      direccion: this.direccion,
      fo_ciudad: this.fo_ciudad,
    };

    if (this.modoEditar) {
      this.clienteService.editar(this.idSeleccionado, datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    } else {
      this.clienteService.insertar(datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    }
  }

  eliminar(item: any): void {
    if (confirm(`¿Eliminar el cliente "${item.nombre} ${item.apellido}"?`)) {
      this.clienteService.eliminar(item.id_cliente).subscribe(() => {
        this.consultar();
      });
    }
  }

  cancelar(): void {
    this.limpiar();
  }

  limpiar(): void {
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.direccion = '';
    this.fo_ciudad = '';
    this.idSeleccionado = null;
    this.mostrarForm = false;
    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}
