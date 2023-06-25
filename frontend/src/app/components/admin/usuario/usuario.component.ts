import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
const debug = true;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public listUsuarios: any[] = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._usuarioService.getListUsuarios().subscribe((result: any) => {
      if (debug) console.log(result);
      this.listUsuarios = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando los clientes`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  eliminarUsuario(id: number) {
    if (debug) console.log('Eliminando usuario ID: ' + id);

    this._usuarioService.deleteUser(id).subscribe(data => {
      this.toastr.warning(`El Usuario fue eliminado con exito`, 'Usuario eliminado')
      this.getUsers();
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarUsuario(usuario: any) {
    if (debug) console.log(usuario);

    this.dialog.open(AgregarUsuario, {
      data: {
        usuario: usuario,
      }
    }).afterClosed().subscribe((res) => {
      if (res) this.getUsers();
    });
  }

  agregarUser() {
    this.dialog.open(AgregarUsuario, {
    }).afterClosed().subscribe((res) => {
      if (res) this.getUsers();
    });
  }
}

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.html',
  styleUrls: ['./usuario.component.css']
})

export class AgregarUsuario implements OnInit {
  public usuario: any;
  public form: FormGroup;
  public passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<AgregarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data !== null) {
      this.usuario = data['usuario'];
    }
  }

  ngOnInit() {
    if (debug) console.log(this.usuario);

    this.form = this.fb.group({
      nombre: [this.usuario?.nombre_u, Validators.required],
      apellido: [this.usuario?.apellido_u, Validators.required],
      correo: [this.usuario?.correo_u, [Validators.required, Validators.email]],
      telefono: [this.usuario?.telefono_u, [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      ident: [this.usuario?.identificacion_u, Validators.required],
      direccion: [this.usuario?.direccion_u, Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).+$')
      ]],
      username: [this.usuario?.username, Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  guardarUsuario() {
    let usuario: any = {
      nombre_u: this.form.get('nombre')?.value,
      apellido_u: this.form.get('apellido')?.value,
      telefono_u: this.form.get('telefono')?.value,
      identificacion_u: this.form.get('ident')?.value,
      direccion_u: this.form.get('direccion')?.value,
      correo_u: this.form.get('correo')?.value,
      password_u: this.form.get('password')?.value,
      username: this.form.get('username')?.value
    }

    if (this.usuario?.id) {
      usuario.id = this.usuario.id;
      this._usuarioService.updateUser(this.usuario.id, usuario).subscribe(data => {
        if (debug) console.log(data);

        this.toastr.success(`El Cliente ${usuario.nombre_c} fue actualizado con exito`, 'Cliente actualizado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error actualizando cliente`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._usuarioService.saveUser(usuario).subscribe(data => {
        if (debug) console.log(data);

        this.toastr.success(`El Usuario ${usuario.nombre_u} fue agregado con exito`, 'Cliente agregado');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error(`Se ha presentado un error agregando cliente`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

}
