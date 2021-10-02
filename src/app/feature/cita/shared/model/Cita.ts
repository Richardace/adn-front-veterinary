import { Cita } from './cita.interface';

export class Citaciones {
    id: number;
    idUsuario: number;
    fecha: string;
    hora: number;
    precio: number;
    notas: string;

    // constructor(
    //     id: number,
    //     idUsuario: number,
    //     fecha: string,
    //     hora: number,
    //     precio: number,
    //     notas: string
    // ) {

    //     this.id = id;
    //     this.idUsuario = idUsuario;
    //     this.fecha = fecha;
    //     this.hora = hora;
    //     this.precio = precio;
    //     this.notas = notas;
    // }

    constructor(cita: Cita) {
        this.id = cita.id;
        this.idUsuario = cita.idUsuario;
        this.fecha = cita.fecha;
        this.hora = cita.hora;
        this.precio = cita.precio;
        this.notas = cita.notas;
      }
}
