import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/feature/usuario/shared/service/usuario-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsuarioServiceService,
    private router: Router) { }

ngOnInit(): void {
if(this.userService.traerRolUsuario() === "admin"){
this.router.navigate(['citas/admin']);
}else if(this.userService.traerRolUsuario() === "user"){
this.router.navigate(['citas/user']);
}
}

}
