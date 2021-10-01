import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/feature/login/login.service';
import { Usuario } from 'src/app/feature/usuario/shared/model/Usuario';
import { RegisterService } from '../../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario = {} as Usuario;

  constructor(private loginService: LoginService,
              private router: Router,
              private registerService: RegisterService) { }

  ngOnInit(): void {
    if(this.loginService.usuarioLogueado()){
      this.router.navigate(['citas']);
    }
  }

  submit(){
    this.usuario.rol = "user";
    this.registerService.crearUsuario(this.usuario)
     .subscribe( 
      () => {
        alert("Registro Exitoso")
        this.router.navigate(['']);
      },
      error => {
        console.log(error.error.mensaje)
        console.log(error.error.nombreExcepcion)
        alert(error.error.mensaje)
        this.router.navigate(['']);
      })
  }

}
