import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/feature/login/login.service';
import { Cita } from '../../shared/model/Cita';
import { CitaService } from '../../shared/service/cita.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  cita = {} as Cita;
  nuevaCita = {} as Cita;

  citas: Observable<Cita[]>;

  @ViewChild("editarCitaTemplate", {static: false}) editarCitaTemplate: TemplateRef<any>;
  @ViewChild("crearCitaTemplate", {static: false}) crearCitaTemplate: TemplateRef<any>;

  constructor(private loginService: LoginService, 
              private router: Router,
              private citaService: CitaService,
              private modalService: NgbModal) { }

  cerrarSesion(){
    console.group("cerrar sesion")
    this.loginService.cerrarSesionUsuario();
    this.router.navigate(['']);
  }

  editar(cita: Cita){
    this.cita = cita;
    this.modalService.open(this.editarCitaTemplate);
  }

  ngOnInit(): void {

    this.listarCitas();
  }

  listarCitas(){
    let idUser = +sessionStorage.getItem('idUser');
    this.citas = this.citaService.consultarbyId(idUser);
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

  crearCita(){
    this.modalService.open(this.crearCitaTemplate);
  }

  crearRegistro(){
    
    this.nuevaCita.idUsuario = +sessionStorage.getItem('idUser');
    if(this.nuevaCita.fecha == undefined){
      this.nuevaCita.fecha = null;
    }else{
      this.nuevaCita.fecha = this.nuevaCita.fecha.toString().concat(" 00:00:00");
    }

    if(isNaN(+this.nuevaCita.hora)){
      this.nuevaCita.hora = null;
    }

    this.citaService.guardar(this.nuevaCita)
     .subscribe( 
      () => {
        console.log("exito")
        this.modalService.dismissAll();
        this.nuevaCita = {} as Cita;
        this.ngOnInit();
      },
      error => {
        alert(error.error.mensaje)
        this.modalService.dismissAll();
        this.nuevaCita = {} as Cita;
        this.ngOnInit();
      })
  }
  

}
