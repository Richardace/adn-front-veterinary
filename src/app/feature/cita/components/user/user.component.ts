import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/feature/login/login.service';
import { Cita } from '../../shared/model/cita.interface';
import { CitaService } from '../../shared/service/cita.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  cita = {} as Cita;
  nuevaCita = {} as Cita;

  public citas: Cita[] = [];

  @ViewChild("editarCitaTemplate", {static: false}) editarCitaTemplate: TemplateRef<any>;
  @ViewChild("crearCitaTemplate", {static: false}) crearCitaTemplate: TemplateRef<any>;

  constructor(private loginService: LoginService, 
              private router: Router,
              private citaService: CitaService,
              public modalService: NgbModal) { }

  cerrarSesion(){
    console.group("cerrar sesion")
    this.loginService.cerrarSesionUsuario();
    this.router.navigate(['']);
  }

  editar(cita: Cita){
    this.cita = cita;
    this.modalService.open(this.editarCitaTemplate);
    return this.modalService.hasOpenModals();
  }

  ngOnInit(): void {

    this.listarCitas();
  }

  listarCitas(){
    let idUser = +sessionStorage.getItem('idUser');
    this.citaService.consultarbyId(idUser).subscribe(
      (data) => {
        this.citas = data;
      }
    );
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
    return this.modalService.hasOpenModals();
  }

  crearRegistro(): boolean{
    
    var success: boolean = true;
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
        success = false;
      })

      return success;
  }
  

}
