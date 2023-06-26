import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/services/venta.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Chart, registerables } from 'chart.js';

const debug = true;

export interface VentaInt {
  id: number,
  fecha_v: any,
  total_v: number,
  usuarioId: number,
  clienteId: number
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  @ViewChild('myChart', { static: true }) myChart: ElementRef;

  form: FormGroup;
  listVentas: VentaInt[] = [];
  prestamosArray: any[] = [];
  displayedColumns: string[] = ['id', 'fecha_v', 'total_v', 'usuarioId', 'clienteId', 'acciones'];
  monthlySales: { month: string, total: number }[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _ventaService: VentaService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getVentas();

    this.form = this.fb.group({
      fechaIni: [''],
      fechaFin: [''],
    });

  }

  createChart(): void {
    const chart = new Chart(this.myChart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.monthlySales.map(sale => sale.month),
        datasets: [
          {
            label: 'Ventas mensuales',
            data: this.monthlySales.map(sale => sale.total),
            backgroundColor: 'rgba(1, 150, 253, 0.2)',
            borderColor: '#0196FD',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  getVentas() {
    this._ventaService.getListVentas().subscribe((data: any) => {
      if (debug) console.log(data);
      this.prestamosArray = data;
      this.listVentas = data;
      this.monthlySales = this.getMonthlySales(data);
      this.createChart();
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
    if (debug) console.log('Eliminando venta ID: ' + id);

    this._ventaService.deleteVenta(id).subscribe(data => {
      this.toastr.warning(`La venta fue eliminado con exito`, 'Venta eliminado')
      this.getVentas();
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarVenta(venta: any) {
    if (debug) console.log(venta);

    this.dialog.open(AgregarVenta, {
      data: {
        venta: venta,
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getVentas();
    });
  }

  verProductos(venta: any) {
    if (debug) console.log(venta);

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
    this.prestamosArray.forEach(element => {
      if (element.fecha_v !== '') {
        const fechaElement = new Date(element.fecha_v).setHours(0, 0, 0, 0);
        const fechaIni = new Date(this.form.value.fechaIni).setHours(0, 0, 0, 0);
        const fechaFin = new Date(this.form.value.fechaFin).setHours(0, 0, 0, 0);

        if (fechaElement >= fechaIni && fechaElement <= fechaFin) {
          this.listVentas.push({
            id: element.id,
            fecha_v: element.fecha_v,
            total_v: element.total_v,
            usuarioId: element.usuarioId,
            clienteId: element.clienteId
          });
        }
      }
    });
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
    if (debug) console.log(this.venta);
    if (debug) console.log(this.verProductos);

    this.form = this.fb.group({
      total_v: [this.venta?.total_v, Validators.required],
      clienteId: [this.venta?.clienteId, Validators.required],
      usuarioId: [this.venta?.usuarioId, Validators.required],
    });

    this._ventaService.listProducts(this.venta.id).subscribe(data => {
      if (debug) console.log(data);
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
        if (debug) console.log(data);

        this.toastr.success(`El Venta ${venta.nombre_c} fue actualizado con exito`, 'Venta actualizado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error actualizando Venta`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._ventaService.saveVenta(venta).subscribe(data => {
        if (debug) console.log(data);

        this.toastr.success(`El Venta ${venta.nombre_c} fue agregado con exito`, 'Venta agregado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error agregando Venta`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

}