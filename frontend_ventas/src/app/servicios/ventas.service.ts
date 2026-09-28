import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private url = environment.apiUrl + 'ventas.php';

  constructor(private http: HttpClient) {}

  consultar(): Observable<any> {
    return this.http.get(`${this.url}?control=consulta`);
  }

  consultarPorCliente(idCliente: any): Observable<any> {
    return this.http.get(`${this.url}?control=consultaPorCliente&id_cliente=${idCliente}`);
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
