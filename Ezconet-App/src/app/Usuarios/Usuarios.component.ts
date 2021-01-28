import { Sexo } from './../_models/Sexo';
import { Usuario } from './../_models/Usuario';
import { UsuariosService } from './../_services/usuarios.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  sexo!: Sexo;
  usuariosFiltrados: Usuario[] = [];
  modalRef!: BsModalRef;
  _filtroLista = '';

  constructor(
      private usuarioService: UsuariosService
    , private modalService: BsModalService
    ) { }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.usuariosFiltrados = this.filtroLista ? this.filtrarUsuarios(this.filtroLista) : this.usuarios;
  }

  openmodal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  ngOnInit() {
    this.getUsuarios();
  }

  filtrarUsuarios(filtrarPor: string): Usuario[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.usuarios.filter(
      usuario => usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  getUsuarios(){
    this.usuarioService.getAllUsuario().subscribe(
      (_usuario: Usuario[]) => {
    this.usuarios = _usuario
    this.usuariosFiltrados = this.usuarios;
  }, error => {
    console.log(error)
  }
  );
}

getAtivo(bol: any){
  if(bol == true)
  {
    return "Sim";
  }else
  {
    return "Não";
  }
}

getSexo(id: any){
  if(id == 1)
  {
    return "Masculino";
  }else
  {
    return "Feminino";
  }
}
}
