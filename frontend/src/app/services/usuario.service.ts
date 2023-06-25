import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myApiUrl = `api/usuario/`;

  constructor(
    private http: HttpClient
  ) {
  }

  getListUsuarios(): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url);

    return this.http.get(url);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url);

    return this.http.delete(url);
  }

  saveUser(user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}`;
    if (environment.test) console.log(url, user);

    return this.http.post(url, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${environment.nodeUri}${this.myApiUrl}${id}`;
    if (environment.test) console.log(url, user);

    return this.http.put(url, user);
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth');
  }

}
