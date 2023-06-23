import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VentaService } from 'src/app/services/venta.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
const debug = true;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  public listVentas: any[] = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _ventaService: VentaService
  ) {
  }

  ngOnInit(): void {
    this.getVentas();
  }


  getVentas() {
    this._ventaService.getListVentas().subscribe((result: any) => {
      if (debug) console.log(result);
      this.listVentas = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando Ventas`, '¡¡ERROR!!')
      console.error(error);
    })
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