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
      declarations: [ AdminComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [{provide: CitaService}, LoginService, HttpService, NgbModal],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(CitaService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('needsLogin returns true when the user has not been authenticated', () => {
    
    
    spyOn(service, 'consultar').and.returnValue(of(dummyCitas));

    component.ngOnInit();
    
    expect(component.citas).toEqual(dummyCitas);

  });

  // it('Debe consultar Citas', () => {
  //   component.ngOnInit();
  //   expect(component.citas).toEqual(dummyCitas);
  // });
});
