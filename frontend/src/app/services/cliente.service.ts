import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private debug = false;
  private myAppUrl = '';
  private myApiUrl = `api/cliente/`;

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = `https://localhost:7148/`;
  }

  getListClientes(): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url);

    return this.http.get(url);
  }

  deleteCliente(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    if (this.debug) console.log(url);

    return this.http.delete(url);
  }

  saveCliente(user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    if (this.debug) console.log(url, user);

    return this.http.post(url, user);
  }

  updateCliente(id: number, user: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}${id}`;
    if (this.debug) console.log(url, user);

    return this.http.put(url, user);
  }

  getByIdent(id: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}byident?id=${id}`;
    if (this.debug) console.log(url);

    return this.http.get(url);
  }
}
