import { UsuarioService } from './../_services/usuario.service';
import { Sexo } from './../_models/Sexo';
import { Usuario } from './../_models/Usuario';
import { UsuariosService } from './../_services/usuarios.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { ToastrService } from 'ngx-toastr';

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
  usuariosFiltrados: Usuario[] = [];

  _filtroLista = '';
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
      this.registerForm.patchValue(usuario);
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
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Usuário: ${usuario.nome}, Código: ${usuario.id}`;
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
      get f() { return this.registerForm.controls; }

      validation(){
        this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          dataNascimento: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          senha: ['', Validators.required],
          sexo: ['',Validators.required],
          ativo: ['', Validators.required]

        })
      }

      salvarAlteracao(template: any) {
        if (this.registerForm.valid) {
          if (this.modoSalvar === 'post') {
            this.usuario = Object.assign({}, this.registerForm.value);
            console.log(this.usuario)
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
