import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  /*   displayedColumns: string[] = ['codigo', 'fechaVenta', 'valorTotalVenta', 'cliente', 'vendedor', 'verProductos'];
    dataSource = new MatTableDataSource<any>([]); // Reemplace el array vacío con sus datos
  
    applyFilter(filterValue: Date) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const date = new Date(data.fechaVenta);
        return date.getTime() === new Date(filter).getTime();
      };
      this.dataSource.filter = filterValue.toISOString();
    }
  
    constructor() {
      const datos = [
        {
          codigo: 1,
          fechaVenta: '23/06/2023',
          valorTotalVenta: 1000,
          cliente: 'Juan Pérez',
          vendedor: 'Pedro García',
          verProductos: 'Ver productos'
        },
        {
          codigo: 2,
          fechaVenta: '22/06/2023',
          valorTotalVenta: 1500,
          cliente: 'María Rodríguez',
          vendedor: 'Laura Sánchez',
          verProductos: 'Ver productos'
        },
        // ... más filas de datos
      ];
  
      this.dataSource = new MatTableDataSource<any>(datos);
    }
   */

  listVentas: any[] = [];
  listClientes: any[] = [];
  listProductos: any[] = [];
  activated: string | null;

  constructor(
    private toastr: ToastrService,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService
  ) {
    this.activated = localStorage.getItem('auth');

    if (this.activated) {
      this.getVentas();
      this.getProductos();
      this.getClientes();
    }
  }

  getVentas() {
    this._ventaService.getListVentas().subscribe((data: any) => {
      this.listVentas = data;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando Ventas`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  getProductos() {
    this._productoService.getListProductos().subscribe((result: any) => {
      this.listProductos = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  getClientes() {
    this._clienteService.getListClientes().subscribe((result: any) => {
      this.listClientes = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando los clientes`, '¡¡ERROR!!')
      console.error(error);
    })
  }
}
