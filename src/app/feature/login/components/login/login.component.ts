import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/feature/usuario/shared/model/Usuario';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.loginService.usuarioLogueado()){
      this.router.navigate(['citas']);
    }
  }

  submit(){
    this.loginService.autenticar(this.usuario)
     .subscribe( 
      result => {
        this.loginService.guardarSesion(result);
        this.router.navigate(['citas']);
      },
      error => {
        alert(error.error.mensaje)
        console.log(error.error.mensaje)
        console.log(error.error.nombreExcepcion)
      })
  }

}
