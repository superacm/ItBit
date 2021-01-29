import { Usuario } from './../_models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  baseURL = 'http://localhost:5000/api/usuario';

  constructor(private http: HttpClient) { }

  getAllUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL);
  }
  getUsuarioByNome(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}/getbynome/${nome}`);
  }
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post(this.baseURL, usuario);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(`${this.baseURL}/${usuario.id}`, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
