import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/feature/login/login.service';
import { Cita } from '../../shared/model/Cita';
import { CitaService } from '../../shared/service/cita.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cita = {} as Cita;

  citas: Observable<Cita[]>;

  @ViewChild("editarRegistroTemplate", {static: false}) editarRegistroTemplate: TemplateRef<any>;

  constructor(private loginService: LoginService, 
              private router: Router,
              private citaService: CitaService,
              private modalService: NgbModal) { }

    ngOnInit(): void {
      this.listarCitas();
    }

  cerrarSesion(){
    console.group("cerrar sesion")
    this.loginService.cerrarSesionUsuario();
    this.router.navigate(['']);
  }

  editar(cita: Cita){
    this.cita = cita;
    this.modalService.open(this.editarRegistroTemplate);
  }



  listarCitas(){
    this.citas = this.citaService.consultar();
  }

  guardarCambios(){
    this.citaService.actualizar(this.cita)
     .subscribe( 
      () => {
        console.log("exito")
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        alert(error.error.mensaje)
        console.log(error.error.mensaje)
        console.log(error.error.nombreExcepcion)
        this.modalService.dismissAll();
        this.ngOnInit();
      })
  }

}
