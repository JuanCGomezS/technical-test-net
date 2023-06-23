import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private debug = false;
  private myAppUrl = '';
  private myApiUrl = `api/producto/`;

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = `https://localhost:7148/`;
  }

  getListProductos(): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url);

    return this.http.get(url);
  }

  deleteProducto(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    if (this.debug) console.log(url);

    return this.http.delete(url);
  }

  saveProducto(user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url, user);

    return this.http.post(url, user);
  }

  updateProducto(id: number, user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    if (this.debug) console.log(url, user);

    return this.http.put(url, user);
  }

  saveProductoVenta(producto: any){
    const url = `${this.myAppUrl}api/VentaProducto`;
    if (this.debug) console.log(url, producto);

    return this.http.post(url, producto);
  }
}
