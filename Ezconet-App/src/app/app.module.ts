import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';

import { UsuariosService } from './_services/usuarios.service';

import { AppComponent } from './app.component';
import { UsuariosComponent } from './Usuarios/Usuarios.component';
import { NavComponent } from './nav/nav.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    NavComponent,
    DateTimeFormatPipePipe
  ],
  imports: [
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsuariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
