import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private myApiUrl = `api/venta`;

  constructor(
    private http: HttpClient
  ) {
  }

  getListVentas(): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }

  listProducts(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}producto/products?id_venta=${id}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }

  deleteVenta(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}/${id}`;
    if (environment.test) console.log(url);

    return this.http.delete(url);
  }

  saveVenta(user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url, user);

    return this.http.post(url, user);
  }

  updateVenta(id: number, user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}/${id}`;
    if (environment.test) console.log(url, user);

    return this.http.put(url, user);
  }
}
