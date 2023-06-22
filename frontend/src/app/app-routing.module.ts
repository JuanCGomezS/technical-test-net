import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VentaComponent } from './components/venta/venta.component';


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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
