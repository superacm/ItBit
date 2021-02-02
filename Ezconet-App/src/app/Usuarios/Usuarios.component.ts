import { DatePipe, formatDate } from '@angular/common';
import { Sexo } from './../_models/Sexo';
import { Usuario } from './../_models/Usuario';
import { UsuariosService } from './../_services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';
import { JsonpClientBackend } from '@angular/common/http';

defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuario!: Usuario;
  sexo!: Sexo;
  ativos!: boolean;
  usuariosFiltrados: Usuario[] = [];
  usuariosFiltradosAtivos: Usuario[] = []
  dataNascimento!: string;
  _filtroLista = '';
  _filtroListaAtivos!: boolean;
  registerForm!: FormGroup;
  submitted = false;
  modoSalvar = 'post';
  bodyDeletarEvento = '';
  modalTitulo = '';

  constructor(
    private usuarioService: UsuariosService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
    , private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
    }

    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.usuariosFiltrados = this.filtroLista ? this.filtrarUsuarios(this.filtroLista) : this.usuarios;
    }

    get filtroListaAtivo(): boolean {
      return this._filtroListaAtivos;
    }
    set filtroListaAtivo(value: boolean) {
      this._filtroListaAtivos = value;
      this.usuariosFiltrados = this._filtroListaAtivos ? this.filtrarUsuariosAtivos(this._filtroListaAtivos) : this.usuarios;
      console.log(this.usuariosFiltrados);
    }

    openModal(template: any ){
      this.registerForm.reset();
      template.show()
    }

    ngOnInit() {
      this.validation();
      this.getUsuarios();

    }
    editarUsuario(usuario: Usuario, template: any) {
      this.modoSalvar = 'put';
      this.modalTitulo = 'Editar Cadastro';
      this.openModal(template);
      this.usuario = Object.assign({}, usuario);
      console.log(this.usuario);
      this.registerForm.patchValue(this.usuario);
    }

    // tslint:disable-next-line: typedef
    novoUsuario(template: any) {
      this.modalTitulo = 'Novo Cadastro';
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    excluirUsuario(usuario: Usuario, template: any) {
      this.openModal(template);
      this.usuario = usuario;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Usuário: ${this.usuario.nome}, Código: ${this.usuario.id}`;
    }

    confirmeDelete(template: any) {
      this.usuarioService.deleteUsuario(this.usuario.id).subscribe(
        () => {
          template.hide();
          this.getUsuarios();
          this.toastr.success('Deletado com Sucesso');
        }, error => {
          this.toastr.error('Erro ao tentar Deletar');
          console.log(error);
        }
        );
      }

      filtrarUsuarios(filtrarPor: string): Usuario[] {
        filtrarPor = filtrarPor.toLocaleLowerCase();
        return this.usuarios.filter(
          usuario => usuario.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
          );
        }



        filtrarUsuariosAtivos(ativos: boolean): Usuario[] {
          let ativo = ativos;
          let uarray  = this.usuarios;
          console.log(uarray);
          return uarray.filter(u =>  u.ativo === ativo );
        }

        get f() { return this.registerForm.controls; }

        validation(){
          this.registerForm = this.fb.group({
            nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
            dataNascimento: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required],
            sexoId: ['',Validators.required],
            ativo: ['', Validators.required]
          })
        }

        salvarAlteracao(template: any) {
          if (this.registerForm.valid) {
            if (this.modoSalvar === 'post') {
              this.usuario = Object.assign({}, this.registerForm.value);
              this.usuarioService.postUsuario(this.usuario).subscribe(
                () => {
                  template.hide();
                  this.getUsuarios();
                  this.toastr.success('Inserido com Sucesso!');
                }, error => {
                  this.toastr.error(`Erro ao Inserir: ${error}`);
                }
                );
              } else {
                this.usuario = Object.assign({ id: this.usuario.id }, this.registerForm.value);
                this.usuarioService.putUsuario(this.usuario).subscribe(
                  () => {
                    template.hide();
                    this.getUsuarios();
                    this.toastr.success('Editado com Sucesso!');
                  }, error => {
                    this.toastr.error(`Erro ao Editar: ${error}`);
                  }
                  );
                }
              }
            }

            getUsuarios(){
              this.usuarioService.getAllUsuario().subscribe(
                (_usuario: Usuario[]) => {
                  this.usuarios = _usuario
                  this.usuariosFiltrados = this.usuarios;
                  this.usuariosFiltradosAtivos = this.usuarios;
                }, error => {
                  this.toastr.error(`Erro ao Editar: ${error}`);
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
                  return "Feminino";
                }else
                {
                  return "Masculino";
                }
              }
            }
