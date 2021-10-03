import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario/shared/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    protected http: HttpService) { }


  public autenticar(usuario: Usuario) {
    return this.http.doPost<Usuario, Usuario>(`${environment.endpoint}/usuarios/autenticar`, usuario,
      this.http.optsName('autenticar'));
  }

  public guardarSesion(usuario: Usuario){
      sessionStorage.setItem('idUser', (usuario.id).toString());
      sessionStorage.setItem('nombre', (usuario.nombre).toString());
      sessionStorage.setItem('correo', (usuario.correo).toString());
      sessionStorage.setItem('rol', (usuario.rol).toString());
      return true;
  }

  usuarioLogueado():boolean {
    let user = sessionStorage.getItem('idUser');
    return !(user === null);
  }

  cerrarSesionUsuario():boolean {
    sessionStorage.removeItem('idUser');
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('correo')
    sessionStorage.removeItem('rol')
    return true;
  }


}
