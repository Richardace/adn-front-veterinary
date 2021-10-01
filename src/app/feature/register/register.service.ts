import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario/shared/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor( protected http: HttpService) { }

  public crearUsuario(usuario: Usuario) {
    return this.http.doPost<Usuario, Usuario>(`${environment.endpoint}/usuarios`, usuario,
      this.http.optsName('Crear Usuario'));
  }
}