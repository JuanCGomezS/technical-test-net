import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AgregarUsuario, UsuarioComponent } from './components/admin/usuario/usuario.component';
import { AgregarCliente, ClienteComponent } from './components/admin/cliente/cliente.component';
import { AgregarProducto, ProductoComponent } from './components/admin/producto/producto.component';
import { AgregarVenta, VentaComponent } from './components/admin/venta/venta.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RealizarVentaComponent } from './components/realizar-venta/realizar-venta.component';
import { SigninComponent } from './components/signin/signin.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UsuarioComponent, AgregarUsuario,
    ClienteComponent, AgregarCliente,
    ProductoComponent, AgregarProducto,
    VentaComponent, AgregarVenta,
    InicioComponent,
    RealizarVentaComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
