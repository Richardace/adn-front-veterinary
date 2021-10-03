import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { LoginService } from 'src/app/feature/login/login.service';
import { Citaciones } from '../../shared/model/Cita';
import { Cita } from '../../shared/model/cita.interface';
import { CitaService } from '../../shared/service/cita.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let service: CitaService;
  let serviceLogin: LoginService;

  let dummyCitas: Cita[] = [
    new Citaciones({
      id: 1,
      idUsuario: 1,
      fecha: "2021-09-31 00:00:00",
      hora: 1900,
      precio: 150000,
      notas: "Prueba"
    }),
    new Citaciones({
      id: 1,
      idUsuario: 1,
      fecha: "2021-09-31 00:00:00",
      hora: 1800,
      precio: 150000,
      notas: "Prueba"
    })
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [{ provide: CitaService }, LoginService, HttpService, NgbModal],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CitaService);
    serviceLogin = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se debe cerrar sesion', () => {

    // Preparacion
    sessionStorage.setItem('idUser', (1).toString());
    sessionStorage.setItem('nombre', ("Richard").toString());
    sessionStorage.setItem('correo', ("richardacevedo98@gmail.com").toString());
    sessionStorage.setItem('rol', ("admin").toString());

    // Accion
    component.cerrarSesion();

    // Comparacion
    expect(true).toEqual(serviceLogin.cerrarSesionUsuario());

  });


  it('Se habilita el modal de editar registro', () => {

    // Preparacion
    let citaEditar: Cita = new Citaciones({
      id: 1,
      idUsuario: 1,
      fecha: "2021-09-31 00:00:00",
      hora: 1800,
      precio: 150000,
      notas: "Prueba"
    })

    //Accion
    let estadoModal = component.editar(citaEditar);

    // Comparacion
    expect(estadoModal).toEqual(true);
  });

  it('Se deben consultar todas las citas', () => {

    // Preparacion
    spyOn(service, 'consultarbyId').and.returnValue(of(dummyCitas));

    //Accion
    component.ngOnInit();

    // Comparacion
    expect(component.citas).toEqual(dummyCitas);

  });

  it('Se deben guardar los cambios al editar Citas Exitosamente', () => {

    // Preparacion
    let citaEditada: Cita = new Citaciones({
      id: 1,
      idUsuario: 1,
      fecha: "2021-09-31 00:00:00",
      hora: 1800,
      precio: 150000,
      notas: "Prueba"
    })
    //Accion
    service.actualizar(citaEditada).subscribe(
      // Comparacion
      () => expect(false).toEqual(component.modalService.hasOpenModals())
    );
  });

  it('Debe editar la cita', async () => {
    const spyRedirect = spyOn(component, 'guardarCambios').and.callThrough();
    component.guardarCambios();
    fixture.detectChanges();
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('Se habilita el modal de crear registro', () => {

    //Accion
    let estadoModal = component.crearCita();

    // Comparacion
    expect(estadoModal).toEqual(true);
  });

  it('Crear Cita', () => {

    //Preparacion
    let nuevoRegistro = {} as Cita;

    nuevoRegistro.idUsuario = 1;
    nuevoRegistro.fecha = "2021-09-31 00:00:00";
    nuevoRegistro.hora = 1800;
    nuevoRegistro.notas = "Registro Cita";

    const spyRedirect = spyOn(component, 'crearRegistro').and.callThrough();
    fixture.detectChanges();
    component.crearRegistro();
    expect(spyRedirect).toHaveBeenCalled();
  });

  // it('Se deben Crear Cita Fallida', async(() => {

  //   document.getElementById('crearCitaBoton').click();
  //   (<HTMLInputElement>document.getElementById('fecha')).value = '2021-09-30 00:00:00';
  //   (<HTMLInputElement>document.getElementById('hora')).value = '1300';
  //   (<HTMLInputElement>document.getElementById('notas')).value = 'Prueba';
  //   document.getElementById('crear').click();
  //   expect(window.alert).toHaveBeenCalledWith('EL HORARIO ENTRE SEMANA ES 6 PM - 10 PM');

  // }));

  it('Se deben Crear Cita Exitosamente', () => {

    // Preparacion
    spyOn(service, 'guardar').and.callThrough();

    //Accion
    component.crearRegistro();

    // Comparacion
    expect(component.crearRegistro()).toEqual(true);

  });

  afterEach(() => {
    fixture.destroy();
  });
});
