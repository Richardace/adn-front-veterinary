import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor() { }

  traerRolUsuario(): string {
    let user = sessionStorage.getItem('rol');
    return user;
  }
}
