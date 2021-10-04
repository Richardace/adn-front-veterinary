import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { LoginService } from "./login.service";

describe('LoginService', () => {

    let service: LoginService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          HttpClientModule
        ],
        providers: [HttpService]
      });
      service = TestBed.inject(LoginService);
    });

    it('Cerrar Sesion Usuario Fallo', () => {

        // Preparacion
        spyOn(service, 'cerrarSesionUsuario').and.returnValue(false);
    
        // Accion
        let estadoUsuario = service.cerrarSesionUsuario();
    
        // Comparacion
        expect(estadoUsuario).toEqual(false);
    
      });

      it('Cerrar Sesion Usuario Exitoso', () => {

        // Preparacion
        spyOn(service, 'cerrarSesionUsuario').and.returnValue(true);
    
        // Accion
        let estadoUsuario = service.cerrarSesionUsuario();
    
        // Comparacion
        expect(estadoUsuario).toEqual(true);
    
      });



});
