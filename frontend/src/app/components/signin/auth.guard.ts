import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userService: UsuarioService, private router: Router) { }

  canActivate: CanActivateFn = (route, state) => {
    const token = this.userService.getToken();

    if (token) {
      return true;
    } else {
      this.router.navigate(['/entrar']);
      return false;
    }
  };
}
