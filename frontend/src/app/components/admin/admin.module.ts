import { NgModule } from '@angular/core';
import { UsuarioComponent } from './usuario/usuario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent } from './producto/producto.component';
import { VentaComponent } from './venta/venta.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminModule { }
