import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
const debug = false;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  public listProductos: any[] = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _productoService: ProductoService
  ) {
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this._productoService.getListProductos().subscribe((result: any) => {
      if (debug) console.log(result);
      this.listProductos = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  eliminarProducto(id: number) {
    if (debug) console.log('Eliminando producto ID: ' + id);

    this._productoService.deleteProducto(id).subscribe(data => {
      this.toastr.warning(`El Producto fue eliminado con exito`, 'Producto eliminado')
      this.getProductos();
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarProducto(producto: any) {
    if (debug) console.log(producto);

    this.dialog.open(AgregarProducto, {
      data: {
        producto: producto,
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getProductos();
    });
  }

  agregarProducto() {
    this.dialog.open(AgregarProducto, {
    }).afterClosed().subscribe((res) => {
      if (res) this.getProductos();
    });
  }
}

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.html'
})

export class AgregarProducto implements OnInit {
  public producto: any;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private dialogRef: MatDialogRef<AgregarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.producto = data['producto'];
    }
  }

  ngOnInit() {
    if (debug) console.log(this.producto);

    this.form = this.fb.group({
      //codigo: [this.producto?.codigo_p, Validators.required],
      nombre: [this.producto?.nombre_p, Validators.required],
      unidades: [this.producto?.unidades_p, [Validators.required]],
      valor: [this.producto?.valor_p, [Validators.required, Validators.maxLength(10), Validators.minLength(3)]]
    });
  }

  guardarProducto() {
    let usuario: any = {
      //codigo_p: this.form.get('codigo')?.value,
      nombre_p: this.form.get('nombre')?.value,
      unidades_p: this.form.get('unidades')?.value,
      valor_p: this.form.get('valor')?.value,
    }

    if (this.producto?.id) {
      usuario.id = this.producto.id;
      this._productoService.updateProducto(this.producto.id, usuario).subscribe(data => {
        if (debug) console.log(data);

        this.toastr.success(`El Producto ${usuario.nombre_c} fue actualizado con exito`, 'Producto actualizado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error actualizando Producto`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._productoService.saveProducto(usuario).subscribe(data => {
        if (debug) console.log(data);

        this.toastr.success(`El Producto ${usuario.nombre_c} fue agregado con exito`, 'Producto agregado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error agregando Producto`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

}
