import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/Cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    protected http: HttpService,
    private httpClient: HttpClient) { }

  public guardar(cita: Cita) {
    return this.http.doPost<Cita, boolean>(`${environment.endpoint}/citas`, cita,
      this.http.optsName('crear Cita'));
  }

  public consultar() {
    return this.http.doGet<Cita[]>(`${environment.endpoint}/citas`,
      this.http.optsName('consultar Citas'));
  }

  public consultarbyId(idUser: number) {
    return this.http.doGet<Cita[]>(`${environment.endpoint}/citas/${idUser}`,
      this.http.optsName('listar por cedula'));
  }

  public actualizar(cita: Cita) {
    return this.httpClient.put<Cita>(`${environment.endpoint}/citas/${cita.id}`,
      cita);
  }
}
