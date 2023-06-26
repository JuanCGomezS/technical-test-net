import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { ClienteComponent } from './components/admin/cliente/cliente.component';
import { ProductoComponent } from './components/admin/producto/producto.component';
import { VentaComponent } from './components/admin/venta/venta.component';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './components/signin/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'entrar',
    component: SigninComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    component: ClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventas',
    component: VentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vender',
    component: RealizarVentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
