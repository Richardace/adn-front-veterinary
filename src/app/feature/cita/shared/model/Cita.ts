export class Cita {
    id: number;
    idUsuario: number;
    fecha: string;
    hora: number;
    precio: number;
    notas: string;

    constructor(
        id: number,
        idUsuario: number,
        fecha: string,
        hora: number,
        precio: number,
        notas: string
    ) {

        this.id = id;
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.hora = hora;
        this.precio = precio;
        this.notas = notas;
    }
}
