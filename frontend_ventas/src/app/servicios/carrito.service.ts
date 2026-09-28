import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CLAVE_CARRITO = 'carrito';

export interface ItemCarrito {
  id_producto: any;
  nombre: string;
  imagen?: string;
  precio: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private items: ItemCarrito[] = this.cargar();
  cambios$ = new BehaviorSubject<ItemCarrito[]>(this.items);

  private cargar(): ItemCarrito[] {
    try {
      const datos = localStorage.getItem(CLAVE_CARRITO);
      return datos ? JSON.parse(datos) : [];
    } catch {
      return [];
    }
  }

  private guardar(): void {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(this.items));
    this.cambios$.next(this.items);
  }

  obtenerItems(): ItemCarrito[] {
    return this.items;
  }

  agregar(producto: any, cantidad: number): void {
    const existente = this.items.find((i) => i.id_producto === producto.id_producto);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push({
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        imagen: producto.imagen,
        precio: Number(producto.precio_venta),
        cantidad,
      });
    }
    this.guardar();
  }

  actualizarCantidad(item: ItemCarrito, cantidad: number): void {
    item.cantidad = Math.max(1, cantidad);
    this.guardar();
  }

  quitar(item: ItemCarrito): void {
    this.items = this.items.filter((i) => i !== item);
    this.guardar();
  }

  vaciar(): void {
    this.items = [];
    this.guardar();
  }

  get totalItems(): number {
    return this.items.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  }

  get total(): number {
    return this.items.reduce((acumulado, item) => acumulado + item.cantidad * item.precio, 0);
  }
}
