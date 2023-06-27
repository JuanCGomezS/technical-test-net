import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuario } from '../../components/admin/usuario/usuario.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  public userDetails: any;
  public form: any;
  public passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (this._authenticationService.isUserLoggedIn) {
      this.router.navigate(['/inicio']);
    }

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  public getEmail() {
    return this.form.get('username');
  }
  public getPassword() {
    return this.form.get('password');
  }

  onSubmitform() {
    this._authenticationService.signIn(this.form.value.username, this.form.value.password);
  }

  registratUser(event: MouseEvent) {
    event.preventDefault();
    this.dialog.open(AgregarUsuario, {
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.router.navigate(['/entrar']);
      }
    });
  }

}
