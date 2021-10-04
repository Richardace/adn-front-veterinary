import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { LoginService } from 'src/app/feature/login/login.service';
import { Usuario } from 'src/app/feature/usuario/shared/model/Usuario';
import { RegisterService } from '../../register.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let serviceLogin: LoginService;
  let serviceRegister: RegisterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [LoginService, HttpService, RegisterService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serviceLogin = TestBed.inject(LoginService);
    serviceRegister = TestBed.inject(RegisterService);
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

  it('Crear Usuario', () => {

    //Preparacion
    let nuevoRegistro = {} as Usuario;

    nuevoRegistro.nombre = "richard";
    nuevoRegistro.correo = "richardacevedo98@gmail.com";
    nuevoRegistro.clave = "1234";
    nuevoRegistro.rol = "user";

    const spyRedirect = spyOn(serviceRegister, 'crearUsuario').and.callThrough();
    fixture.detectChanges();
    serviceRegister.crearUsuario(nuevoRegistro);
    expect(spyRedirect).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
