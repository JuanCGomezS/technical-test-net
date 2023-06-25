import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userName: any;
  headers = new HttpHeaders().set('content-type', 'application/json');
  private debug = false;

  private myApiUrl = `api/usuario/`;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient
  ) {

  }

  public get isUserLoggedIn() {
    return !!(localStorage.getItem('auth'));
  }

  userDetails() {
    const token = localStorage.getItem('auth');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        return JSON.stringify(decoded);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  public signIn(username: string, password_u: string) {
    const url = `${environment.nodeUri}${this.myApiUrl}authenticate`;
    if (this.debug) console.log(url, { username, password_u }, { headers: this.headers });

    this.http.post(url, { username, password_u }, { headers: this.headers }).subscribe((res: any) => {
      localStorage.setItem('auth', JSON.stringify(res));

      location.reload();
    }, (error) => {
      localStorage.clear();
      if (error.error.message === 'Usuario no encontrado') {
        this.toastr.error(`Usuario no encontrado`, '¡¡ERROR!!');
        return;
      }
      if (error.error.message === 'Contraseña incorrecta') {
        this.toastr.error(`Contraseña incorrecta`, '¡¡ERROR!!')
        return
      }

      this.toastr.error(`Se presento un error`, '¡¡ERROR!!')

    })
  }
}
