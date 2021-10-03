import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/feature/login/login.service';
import { Cita } from '../../shared/model/cita.interface'; 
import { CitaService } from '../../shared/service/cita.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  cita = {} as Cita;

  public citas: Cita[] = [];

  @ViewChild("editarRegistroTemplate", {static: false}) editarRegistroTemplate: TemplateRef<any>;

  constructor(private loginService: LoginService, 
              private router: Router,
              private citaService: CitaService,
              public modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarCitas();
  }

  cerrarSesion(){
    this.loginService.cerrarSesionUsuario();
    this.router.navigate(['']);
  }

  editar(cita: Cita){
    this.cita = cita;
    this.modalService.open(this.editarRegistroTemplate);
    return this.modalService.hasOpenModals();
  }



  listarCitas(): void{
    this.citaService.consultar().subscribe(
      (data) => {
        this.citas = data;
      }
    );
  }

  guardarCambios(){
    this.citaService.actualizar(this.cita)
     .subscribe( 
      () => {
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        alert(error.error.mensaje)
        this.modalService.dismissAll();
        this.ngOnInit();
      })
  }

}
