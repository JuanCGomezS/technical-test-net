import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  public listClientes: any[] = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _clienteService: ClienteService
  ) {
  }

  ngOnInit(): void {
    this.getClientes();
  }
  
  getClientes() {
    this._clienteService.getListClientes().subscribe((result: any) => {
      if (environment.test) console.log(result);
      this.listClientes = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando los clientes`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  eliminarCliente(id: number) {
    if (environment.test) console.log('Eliminando cliente ID: ' + id);

    this._clienteService.deleteCliente(id).subscribe(data => {
      this.toastr.warning(`El Cliente fue eliminado con exito`, 'Cliente eliminado')
      this.getClientes();
    }, error => {
      this.toastr.error(`Se ha presentado un error borrando cliente`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarCliente(cliente: any) {
    if (environment.test) console.log(cliente);

    this.dialog.open(AgregarCliente, {
      data: {
        cliente: cliente,
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getClientes();
    });
  }

  agregarCliente() {
    this.dialog.open(AgregarCliente, {
    }).afterClosed().subscribe((res) => {
      if (res) this.getClientes();
    });
  }
}

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.html'
})

export class AgregarCliente implements OnInit {
  public cliente: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _clienteService: ClienteService,
    private dialogRef: MatDialogRef<AgregarCliente>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.cliente = data['cliente'];
    }
  }

  ngOnInit() {
    if (environment.test) console.log(this.cliente);

    this.form = this.fb.group({
      nombre: [this.cliente?.nombre_c, Validators.required],
      apellido: [this.cliente?.apellido_c, Validators.required],
      correo: [this.cliente?.correo_c, [Validators.required, Validators.email]],
      telefono: [this.cliente?.telefono_c, [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      ident: [this.cliente?.identificacion_c, Validators.required],
      direccion: [this.cliente?.direccion_c, Validators.required],
    });
  }

  guardarCliente() {
    let cliente: any = {
      identificacion_c: this.form.get('ident')?.value,
      nombre_c: this.form.get('nombre')?.value,
      apellido_c: this.form.get('apellido')?.value,
      correo_c: this.form.get('correo')?.value,
      telefono_c: this.form.get('telefono')?.value,
      direccion_c: this.form.get('direccion')?.value
    }

    if (this.cliente?.id) {
      cliente.id = this.cliente.id;
      this._clienteService.updateCliente(this.cliente.id, cliente).subscribe(data => {
        if (environment.test) console.log(data);

        this.toastr.success(`El Cliente ${cliente.nombre_c} fue actualizado con exito`, 'Cliente actualizado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error actualizando cliente`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._clienteService.saveCliente(cliente).subscribe(data => {
        if (environment.test) console.log(data);

        this.toastr.success(`El Cliente ${cliente.nombre_c} fue agregado con exito`, 'Cliente agregado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error agregando cliente`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

}
