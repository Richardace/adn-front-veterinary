import { by, element } from 'protractor';

export class CitaPage {

    private inputFechaCita = element(by.id('fecha'));
    private inputHoraCita = element(by.id('hora'));
    private inputNotaCita = element(by.id('notas'));
    
    private botonCrearAbreModal = element(by.id('crearCitaBoton'));
    private botonCrear = element(by.id('crear'));
    private botonCerrarSesion = element(by.id('cerrarSesion'));

    private listarCitas = element.all(by.css('table.tbody.tr'));

    async ingresarFecha(fecha){
        await this.inputFechaCita.sendKeys(fecha);
    }
    async ingresarHora(hora){
        await this.inputHoraCita.sendKeys(hora);
    }
    async ingresarNotas(notas){
        await this.inputNotaCita.sendKeys(notas);
    }

    async clickCerrarSesion(){
        await this.botonCerrarSesion.click();
    }

    async clickCrear(){
        await this.botonCrear.click();
    }

    async clickCrearAbreModal(){
        await this.botonCrearAbreModal.click();
    }

    async contarCitas() {
        return this.listarCitas.count();
    }
}
