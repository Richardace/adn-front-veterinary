import { browser, by, element } from 'protractor';

export class ReservaPage {
    private inputCedulaDeCliente = element(by.id('cedulaCliente'));
    private inputNombreDeLaPelicula = element(by.id('nombreDeLaPelicula'));
    private inputIdReservaParaEliminar = element(by.id('idReserva'));
    private inputDiasDeReserva = element(by.id('diasDeReserva'));
    private botonReservar = element(by.id('botonReservar'));
    private botonEliminar = element(by.id('btnEliminarReserva'));
    private botonConsultar = element(by.id('btnConsultar'));
    private botonModificarReserva = element(by.id('btnRedirectModificarReserva'));
    private botonGuardarReserva = element(by.id('btnGuardarReservaModificada'));
    private listaReservas = element.all(by.css('app-listar-reserva table.tbody.tr'));

    async irAListarReservas(): Promise<number> {
        return browser.get(browser.baseUrl + '/reservas/listar');
    }
    async irACrearReserva(): Promise<number> {
        return browser.get(browser.baseUrl + '/reservas/crear');
    }
    async irABorrarReserva(): Promise<number> {
        return browser.get(browser.baseUrl + '/reservas/borrar');
    }
    async irAFiltrarPorCedulaReserva(): Promise<number> {
        return browser.get(browser.baseUrl + '/reservas/listar-por-cedula');
    }
    async ingresarCedulaDeCliente(cedulaDeCliente){
        await this.inputCedulaDeCliente.sendKeys(cedulaDeCliente);
    }
    async ingresarNombreDeLaPelicula(nombreDeLaPelicula){
        await this.inputNombreDeLaPelicula.sendKeys(nombreDeLaPelicula);
    }
    async ingresarDiasDeReserva(diasDeReserva){
        await this.inputDiasDeReserva.sendKeys(diasDeReserva);
    }
    async ingresarIdReservaParaEliminar(idReserva){
        await this.inputIdReservaParaEliminar.sendKeys(idReserva);
    }
    async clickBotonReservar(){
        await this.botonReservar.click();
    }
    async clickBotonEliminarReserva(){
        await this.botonEliminar.click();
    }
    async clickBotonModificarReserva(){
        await this.botonModificarReserva.click();
    }
    async clickBotonGuardarReservaModifica(){
        await this.botonGuardarReserva.click();
    }
    async clickBotonConsultar(){
        await this.botonConsultar.click();
    }
    async contarReservas() {
        return this.listaReservas.count();
    }
}
