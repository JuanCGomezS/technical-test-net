import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private debug = false;
  private myAppUrl = '';
  private myApiUrl = `api/venta`;

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = `https://localhost:7148/`;
  }

  getListVentas(): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url);

    return this.http.get(url);
  }

  listProducts(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}producto/products?id_venta=${id}`;
    if (this.debug) console.log(url);

    return this.http.get(url);
  }

  deleteVenta(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    if (this.debug) console.log(url);

    return this.http.delete(url);
  }

  saveVenta(user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url, user);

    return this.http.post(url, user);
  }

  updateVenta(id: number, user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${id}`;
    if (this.debug) console.log(url, user);

    return this.http.put(url, user);
  }
}
