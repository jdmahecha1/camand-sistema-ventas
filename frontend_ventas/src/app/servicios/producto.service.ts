import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private url = environment.apiUrl + 'producto.php';

  constructor(private http: HttpClient) {}

  consultar(): Observable<any> {
    return this.http.get(`${this.url}?control=consulta`);
  }

  insertar(datos: any): Observable<any> {
    return this.http.post(`${this.url}?control=insertar`, datos);
  }

  editar(id: any, datos: any): Observable<any> {
    return this.http.post(`${this.url}?control=editar&id=${id}`, datos);
  }

  eliminar(id: any): Observable<any> {
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }
}
