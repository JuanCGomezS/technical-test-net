import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from './services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuario } from './components/admin/usuario/usuario.component';
import { environment } from '../environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isRegistered = false;
  user;

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.user = JSON.parse(this.authService.userDetails() ?? '{}');
    if (environment.test) console.log('Vendedor Logueado', this.user);
  }

  public get isUserLoggedIn() {
    return this.authService.isUserLoggedIn || false;
  }

  ngOnInit() {
    if (this.isUserLoggedIn) {
      this.observer
        .observe(['(max-width: 800px)'])
        .pipe(delay(1), untilDestroyed(this))
        .subscribe((res) => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        });

      this.router.events
        .pipe(
          untilDestroyed(this),
          filter((e) => e instanceof NavigationEnd)
        )
        .subscribe(() => {
          if (this.sidenav.mode === 'over') {
            this.sidenav.close();
          }
        });
    }
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

  logout() {
    localStorage.clear();
    this.sidenav.close();
    location.reload();
    //this.router.navigate(['/inicio']);
  }
}
