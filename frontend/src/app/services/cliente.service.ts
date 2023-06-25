import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myApiUrl = `api/cliente/`;

  constructor(
    private http: HttpClient
  ) {
  }

  getListClientes(): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }

  deleteCliente(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url);

    return this.http.delete(url);
  }

  saveCliente(user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url, user);

    return this.http.post(url, user);
  }

  updateCliente(id: number, user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url, user);

    return this.http.put(url, user);
  }

  getByIdent(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}byident?id=${id}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }
}
