import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cita } from '../../shared/model/cita.interface';
import { CitaService } from '../../shared/service/cita.service';
import { AdminComponent } from './admin.component';
import { Citaciones } from '../../shared/model/Cita';
import { LoginService } from 'src/app/feature/login/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

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
      id: 2,
      idUsuario: 1,
      fecha: "2021-09-31 00:00:00",
      hora: 1800,
      precio: 150000,
      notas: "Prueba"
    })
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
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
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CitaService);
    serviceLogin = TestBed.inject(LoginService);
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Se deben consultar todas las citas', () => {

    // Preparacion
    spyOn(service, 'consultar').and.returnValue(of(dummyCitas));

    //Accion
    component.ngOnInit();

    // Comparacion
    expect(component.citas).toEqual(dummyCitas);

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

});
