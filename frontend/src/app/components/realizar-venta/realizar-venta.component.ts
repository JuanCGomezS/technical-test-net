import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { VentaService } from 'src/app/services/venta.service';

const debug = false;

@Component({
  selector: 'app-realizar-venta',
  templateUrl: './realizar-venta.component.html',
  styleUrls: ['./realizar-venta.component.css']
})
export class RealizarVentaComponent implements OnInit {
  public listProductos: any[] = [];
  public listProdAdd: any[] = [];
  public unidades_dis: any;
  public total_venta = 0;
  public form: FormGroup;
  public cliente: any;
  public flags = {
    invalidIdent: false,
    isDisabled: true
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private _clienteService: ClienteService,
    private _ventaService: VentaService
  ) {
    this._productoService.getListProductos().subscribe((result: any) => {
      if (debug) console.log(result);
      this.listProductos = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      ident: ['', Validators.required],
      nombre: [{ value: '', disabled: this.flags.isDisabled }, Validators.required],
      apellido: [{ value: '', disabled: this.flags.isDisabled }, Validators.required],
      telefono: [{ value: '', disabled: this.flags.isDisabled }, [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      direccion: [{ value: '', disabled: this.flags.isDisabled }, Validators.required],
      correo: [{ value: '', disabled: this.flags.isDisabled }, [Validators.required, Validators.email]],

      producto: [{ value: '', disabled: this.flags.isDisabled }, Validators.required],
      unidades: [{ value: '', disabled: this.flags.isDisabled }, Validators.required]
    });
  }

  buscarCliente() {
    const id = this.form.get('ident')?.value;
    const fieldsToReset = ['nombre', 'apellido', 'telefono', 'direccion', 'correo'];

    fieldsToReset.forEach(field => {
      this.form.get(field)?.reset();
    });

    if (id) {
      this._clienteService.getByIdent(id).subscribe(data => {
        if (debug) console.log('Cliente >', data);
        
        if (data.length > 0) {
          this.cliente = data[0];

          this.form.patchValue({
            nombre: this.cliente.nombre_c,
            apellido: this.cliente.apellido_c,
            telefono: this.cliente.telefono_c,
            direccion: this.cliente.direccion_c,
            correo: this.cliente.correo_c
          });

          this.toastr.success(`Usuario ${this.cliente.nombre_c}`);
          Object.keys(this.form.controls).forEach(key => {
            if (key === 'producto' || key === 'unidades') {
              this.form.get(key)?.enable();
            } else if (key !== 'ident') { this.form.get(key)?.disable(); }
          });
        } else {
          this.cliente = null;
          this.toastr.info(`El usuario no está registrado`);
          Object.keys(this.form.controls).forEach(key => {
            this.form.get(key)?.enable();
          });
        }
        this.flags.isDisabled = false;

      }, error => {
        this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!');
        console.error(error);
      });
    } else {
      this.toastr.warning(`Debe agregar el número de identificación para continuar`);
    }
  }

  eliminarProd(prod: any) {
    const index = this.listProdAdd.indexOf(prod);
    const producto = this.listProductos.find(p => p.id === prod.id);

    producto.unidades_p = producto.unidades_p + prod.unidades;
    this.unidades_dis = producto.unidades_p;
    this.total_venta -= prod.valor;

    if (index > -1) {
      this.listProdAdd.splice(index, 1);
    }
  }

  changeProd(e: any) {
    const selectedProduct = this.form.get('producto')?.value;
    this.unidades_dis = selectedProduct?.unidades_p || null;
  }

  agregarProducto() {
    if (this.form.get('producto')?.value && this.form.get('unidades')?.value) {
      let prod = this.form.get('producto')?.value;

      if (this.form.get('unidades')?.value <= prod.unidades_p) {
        let prodCopy = Object.assign({}, prod);
        prodCopy.unidades = this.form.get('unidades')?.value;
        prodCopy.valor = prodCopy.valor_p * prodCopy.unidades;
        prod.unidades_p = prod.unidades_p - prodCopy.unidades;
        this.unidades_dis = prod.unidades_p;
        this.total_venta += prodCopy.valor;
        this.listProdAdd.push(prodCopy);

        this.toastr.success(`Se agregaron ${prodCopy.unidades} Unidades de ${prodCopy.nombre_p}`, 'Producto agregado');
      } else {
        this.toastr.warning(`No hay suficientes unidades`);
      }
    } else {
      this.toastr.warning(`Debe seleccionar un producto para agregarlo`);
    }
  }

  async guardarVenta() {
    if (!this.cliente) {
      const cliente = {
        identificacion_c: this.form.get('ident')?.value,
        nombre_c: this.form.get('nombre')?.value,
        apellido_c: this.form.get('apellido')?.value,
        correo_c: this.form.get('correo')?.value,
        telefono_c: this.form.get('telefono')?.value,
        direccion_c: this.form.get('direccion')?.value
      }

      this.cliente = await this._clienteService.saveCliente(cliente).toPromise();
      if (debug) console.log('Cliente Guardar venta >', this.cliente);
    }

    let venta: any = {
      total_v: this.total_venta,
      clienteId: this.cliente?.id,
      usuarioId: 1,
    }
    if (debug) console.log('Venta >', venta);

    this._ventaService.saveVenta(venta).subscribe(data => {
      for (const producto of this.listProdAdd) {
        const prod: any = {
          ventaId: data.id,
          productoId: producto.id,
          unidades: producto.unidades
        }

        this._productoService.saveProductoVenta(prod).subscribe(data => {
          if (debug) console.log('saveProductoVenta >', data);
        });
      }
      if (data) {
        this.toastr.success(`Se registro la venta ${data.id} con exito`);
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          if (key !== 'ident') { this.form.get(key)?.disable(); }
        });
      } else {
        this.toastr.warning(`Error guardando la venta`);
      }
    })

  }

}
