import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myApiUrl = `api/producto/`;

  constructor(
    private http: HttpClient
  ) {
  }

  getListProductos(): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }

  deleteProducto(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url);

    return this.http.delete(url);
  }

  saveProducto(user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url, user);

    return this.http.post(url, user);
  }

  updateProducto(id: number, user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url, user);

    return this.http.put(url, user);
  }

  saveProductoVenta(producto: any){
    const url = `${environment.nodeUri}api/VentaProducto`;
    if (environment.test) console.log(url, producto);

    return this.http.post(url, producto);
  }
}
