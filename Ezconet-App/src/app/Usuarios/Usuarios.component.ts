import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Usuarios',
  templateUrl: './Usuarios.component.html',
  styleUrls: ['./Usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this.http.get('http://localhost:5000/api/values').subscribe( response => {
      this.usuarios = response
      console.log(response);
    }, error => {
        console.log(error)
    }
    );
  }

}
