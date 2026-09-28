import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../servicios/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categoria implements OnInit {
  categorias: any[] = [];
  mostrarForm = false;
  modoEditar = false;
  idSeleccionado: any = null;

  nombre = '';

  constructor(private categoriaService: CategoriaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.consultar();
  }

  consultar(): void {
    this.categoriaService.consultar().subscribe((res: any) => {
      this.categorias = res;
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
    this.idSeleccionado = item.id_categoria;
    this.nombre = item.nombre;
    this.mostrarForm = true;
    this.modoEditar = true;
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (this.nombre.trim() === '') {
      alert('El nombre es obligatorio');
      return;
    }

    const datos = { nombre: this.nombre };

    if (this.modoEditar) {
      this.categoriaService.editar(this.idSeleccionado, datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    } else {
      this.categoriaService.insertar(datos).subscribe(() => {
        this.consultar();
        this.limpiar();
      });
    }
  }

  eliminar(item: any): void {
    if (confirm(`¿Eliminar la categoría "${item.nombre}"?`)) {
      this.categoriaService.eliminar(item.id_categoria).subscribe(() => {
        this.consultar();
      });
    }
  }

  cancelar(): void {
    this.limpiar();
  }

  limpiar(): void {
    this.nombre = '';
    this.idSeleccionado = null;
    this.mostrarForm = false;
    this.modoEditar = false;
    this.cdr.detectChanges();
  }
}
