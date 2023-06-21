import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrador-usuario',
  templateUrl: './administrador-usuario.component.html',
  styleUrls: ['./administrador-usuario.component.css']
})
export class AdministradorUsuarioComponent implements OnInit {
  public listUsuarios: any[] = [];
  public accion = 'Agregar';
  public form: FormGroup;
  public id: number | undefined;
  public debug = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(7)]]
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this._usuarioService.getListUsuarios().subscribe((result: any) => {
      if (this.debug) console.log(result);
      this.listUsuarios = result;
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  guardarUsuario() {
    let usuario: any = {
      nombre_u: this.form.get('nombre')?.value,
      apellido_u: this.form.get('apellido')?.value,
      correo_u: this.form.get('correo')?.value,
      telefono_u: this.form.get('telefono')?.value,
    }

    if (this.id) {
      usuario.id = this.id;
      this._usuarioService.updateUser(this.id, usuario).subscribe(data => {
        if (this.debug) console.log(data);
        
        this.toastr.success(`El usuario ${usuario.nombre_u} fue actualizado con exito`, 'Usuario actualizado');
        this.accion = 'Agregar';
        this.id = undefined;
        this.form.reset();
        this.getUsers();
      }, error => {
        this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
        console.error(error);
      })

    } else {
      this._usuarioService.saveUser(usuario).subscribe(data => {
        if (this.debug) console.log(data);

        this.toastr.success(`El usuario ${usuario.nombre_u} fue agregado con exito`, 'Usuario agregado');
        this.form.reset();
        this.getUsers();
      }, error => {
        this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
        console.error(error);
      })
    }
  }

  eliminarUsuario(id: number) {
    this._usuarioService.deleteUser(id).subscribe(data => {
      this.toastr.warning(`El Usuario fue eliminado con exito`, 'Usuario eliminado')
      this.getUsers();
    }, error => {
      this.toastr.error(`Se ha presentado un error`, '¡¡ERROR!!')
      console.error(error);
    });
  }

  editarUsuario(usuario: any) {
    this.accion = 'Editar';
    this.id = usuario.id;
    if (this.debug) console.log(this.id);

    this.form.patchValue({
      nombre: usuario.nombre_u,
      apellido: usuario.apellido_u,
      correo: usuario.correo_u,
      telefono: usuario.telefono_u
    })
  }
}
