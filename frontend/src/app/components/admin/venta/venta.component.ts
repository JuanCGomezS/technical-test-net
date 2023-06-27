import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/services/venta.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { environment } from '../../../../environments/environment';

export interface VentaInt {
  id: number,
  fecha_v: any,
  total_v: number,
  usuarioId: number,
  clienteId: number
  usuario: any,
  cliente: any
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  form: FormGroup;
  listVentas: VentaInt[] = [];
  filtroVentasArray: any[] = [];
  displayedColumns: string[] = ['id', 'fecha_v', 'total_v', 'usuarioId', 'clienteId', 'acciones'];
  reporteButton: boolean;
  fechaIni: number;
  fechaFin: number;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _ventaService: VentaService,
    private _imprimirService: ReporteService
  ) {
  }

  ngOnInit(): void {
    this.getVentas();

    this.form = this.fb.group({
      fechaIni: [''],
      fechaFin: [''],
    });

  }

  getVentas() {
    this._ventaService.getListVentas().subscribe((data: any) => {
      if (environment.test) console.log(data);
      this.filtroVentasArray = data;
      this.listVentas = data;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando Ventas`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  getMonthlySales(ventas: any[]): { month: string, total: number }[] {
    const monthlySales: { [month: string]: number } = {};

    ventas.forEach(venta => {
      const date = new Date(venta.fecha_v);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlySales[month]) {
        monthlySales[month] = 0;
      }

      monthlySales[month] += venta.total_v;
    });

    return Object.entries(monthlySales).map(([month, total]) => ({ month, total }));
  }

  eliminarVenta(id: number) {
    if (environment.test) console.log('Eliminando venta ID: ' + id);

    this._ventaService.deleteVenta(id).subscribe(data => {
      this.toastr.warning(`La venta fue eliminado con exito`, 'Venta eliminado')
      this.getVentas();
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarVenta(venta: any) {
    if (environment.test) console.log(venta);

    this.dialog.open(AgregarVenta, {
      data: {
        venta: venta,
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getVentas();
    });
  }

  verProductos(venta: any) {
    if (environment.test) console.log(venta);

    this.dialog.open(AgregarVenta, {
      data: {
        venta: venta,
        view: true
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getVentas();
    });
  }

  agregarVenta() {
    this.dialog.open(AgregarVenta, {
    }).afterClosed().subscribe((res) => {
      if (res) this.getVentas();
    });
  }

  buscarVenta() {
    if (this.form.invalid) {
      return;
    }

    this.listVentas = [];
    this.filtroVentasArray.forEach(element => {
      if (element.fecha_v !== '') {
        const fechaElement = new Date(element.fecha_v).setHours(0, 0, 0, 0);
        this.fechaIni = new Date(this.form.value.fechaIni).setHours(0, 0, 0, 0);
        this.fechaFin = new Date(this.form.value.fechaFin).setHours(0, 0, 0, 0);

        if (fechaElement >= this.fechaIni && fechaElement <= this.fechaFin) {
          this.listVentas.push({
            id: element.id,
            fecha_v: element.fecha_v,
            total_v: element.total_v,
            usuarioId: element.usuarioId,
            clienteId: element.clienteId,
            usuario: element.usuario,
            cliente: element.cliente
          });
        }
      }
    });

    this.reporteButton = true;
  }

  imprimi() {
    console.log(this.listVentas);
    const head = ["Id Venta", "Fecha Venta", " Total Venta", "Cliente", "Vendedor"];

    const body = Object(this.listVentas).map((data: any) => {
      const fecha = new Date(data.fecha_v);
      const formattedFecha = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });

      const datos = [
        data.id,
        formattedFecha,
        `$${data.total_v}`,
        data.clienteId,
        data.usuarioId
      ];
      return datos;
    });

    const inicio = new Date(this.fechaIni)
    const fin = new Date(this.fechaFin)
    const namefile = `${inicio.getDate()}-${inicio.getMonth() + 1}-${inicio.getFullYear()} a ${fin.getDate()}-${fin.getMonth() + 1}-${fin.getFullYear()}`

    this._imprimirService.imprimir(head, body, `Ventas Antojitos ${namefile}`, namefile, true)

  }
}

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.html'
})

export class AgregarVenta implements OnInit {
  public venta: any;
  public form: FormGroup;
  public verProductos: boolean;
  public listProducts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _ventaService: VentaService,
    private dialogRef: MatDialogRef<AgregarVenta>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.venta = data['venta'];
      this.verProductos = data['view'];
    }
  }

  ngOnInit() {
    if (environment.test) console.log(this.venta);
    if (environment.test) console.log(this.verProductos);

    this.form = this.fb.group({
      total_v: [this.venta?.total_v, Validators.required],
      clienteId: [this.venta?.clienteId, Validators.required],
      usuarioId: [this.venta?.usuarioId, Validators.required],
    });

    this._ventaService.listProducts(this.venta.id).subscribe(data => {
      if (environment.test) console.log(data);
      this.listProducts = data;

    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos de la venta ${this.venta.id}`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  guardarVenta() {
    let venta: any = {
      total_v: this.form.get('total_v')?.value,
      clienteId: this.form.get('clienteId')?.value,
      usuarioId: this.form.get('usuarioId')?.value,
    }

    if (this.venta?.id) {
      venta.id = this.venta.id;
      this._ventaService.updateVenta(this.venta.id, venta).subscribe(data => {
        if (environment.test) console.log(data);

        this.toastr.success(`El Venta ${venta.nombre_c} fue actualizado con exito`, 'Venta actualizado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error actualizando Venta`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._ventaService.saveVenta(venta).subscribe(data => {
        if (environment.test) console.log(data);

        this.toastr.success(`El Venta ${venta.nombre_c} fue agregado con exito`, 'Venta agregado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error agregando Venta`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

}