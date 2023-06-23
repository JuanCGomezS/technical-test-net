import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { ClienteComponent } from './components/admin/cliente/cliente.component';
import { ProductoComponent } from './components/admin/producto/producto.component';
import { VentaComponent } from './components/admin/venta/venta.component';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'usuarios',
    component: UsuarioComponent,
  },
  {
    path: 'clientes',
    component: ClienteComponent,
  },
  {
    path: 'productos',
    component: ProductoComponent,
  },
  {
    path: 'ventas',
    component: VentaComponent,
  },
  {
    path: 'vender',
    component: RealizarVentaComponent,
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
