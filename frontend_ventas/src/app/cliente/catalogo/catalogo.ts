import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-catalogo',
  standalone: false,
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  productos: any[] = [];
  categorias: string[] = [];
  categoriaActiva = 'Todas';
  mensajeAgregado: string | null = null;

  constructor(private productoService: ProductoService, private carrito: CarritoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productoService.consultar().subscribe((res: any) => {
      this.productos = res.map((p: any) => ({ ...p, cantidadSeleccionada: 1 }));
      this.categorias = ['Todas', ...new Set(res.map((p: any) => p.categoria))] as string[];
      this.cdr.detectChanges();
    });
  }

  get productosFiltrados(): any[] {
    if (this.categoriaActiva === 'Todas') {
      return this.productos;
    }
    return this.productos.filter((p) => p.categoria === this.categoriaActiva);
  }

  filtrar(categoria: string): void {
    this.categoriaActiva = categoria;
    this.cdr.detectChanges();
  }

  agregarAlCarrito(producto: any): void {
    const cantidad = Number(producto.cantidadSeleccionada) || 1;
    this.carrito.agregar(producto, cantidad);
    producto.cantidadSeleccionada = 1;
    this.mensajeAgregado = `"${producto.nombre}" se agregó al carrito`;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.mensajeAgregado = null;
      this.cdr.detectChanges();
    }, 2200);
  }
}
