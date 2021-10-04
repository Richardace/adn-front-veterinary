import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Usuario } from 'src/app/feature/usuario/shared/model/Usuario';
import { LoginService } from '../../login.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serviceLogin: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LoginService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serviceLogin = TestBed.inject(LoginService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Usuario Logueado', () => {

    // Preparacion
    sessionStorage.setItem('idUser', (1).toString());
    spyOn(serviceLogin, 'usuarioLogueado').and.returnValue(true);

    // Accion
    let estadoLogin = serviceLogin.usuarioLogueado();

    // Comparacion
    expect(estadoLogin).toEqual(true);

  });

  it('Usuario NO Logueado', () => {

    // Preparacion
    spyOn(serviceLogin, 'usuarioLogueado').and.returnValue(false);

    // Accion
    let estadoLogin = serviceLogin.usuarioLogueado();

    // Comparacion
    expect(estadoLogin).toEqual(false);

  });

  it('Guardar Sesion Usuario', () => {

    // Preparacion
    spyOn(serviceLogin, 'guardarSesion').and.returnValue(true);
    let nuevoRegistro = {} as Usuario;

    nuevoRegistro.nombre = "richard";
    nuevoRegistro.correo = "richardacevedo98@gmail.com";
    nuevoRegistro.clave = "1234";
    nuevoRegistro.rol = "user";

    // Accion
    let estadoAutenticacion = serviceLogin.guardarSesion(nuevoRegistro);

    // Comparacion
    expect(estadoAutenticacion).toEqual(true);

  });

  it('Guardar Sesion Usuario Fallo', () => {

    // Preparacion
    spyOn(serviceLogin, 'guardarSesion').and.returnValue(false);
    let nuevoRegistro = {} as Usuario;

    nuevoRegistro.nombre = "richard";
    nuevoRegistro.correo = "richardacevedo98@gmail.com";
    nuevoRegistro.clave = "1234";
    nuevoRegistro.rol = "user";

    // Accion
    let estadoAutenticacion = serviceLogin.guardarSesion(nuevoRegistro);

    // Comparacion
    expect(estadoAutenticacion).toEqual(false);

  });

  afterEach(() => {
    fixture.destroy();
  });
});
