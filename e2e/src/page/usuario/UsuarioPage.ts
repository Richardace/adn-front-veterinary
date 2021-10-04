import { browser, by, element } from 'protractor';

export class UsuarioPage {

    private inputNombreDeUsuario = element(by.id('nombre'));
    private inputCorreoDeUsuario = element(by.id('correo'));
    private inputPasswordDeUsuario = element(by.id('password'));
    
    private botonIniciarSesion = element(by.id('iniciar'));
    private botonRegistrar = element(by.id('registrar'));
    private botonCerrarSesion = element(by.id('cerrarSesion'));

    async irAIniciarSesion(): Promise<number> {
        return browser.get(browser.baseUrl + '/login');
    }

    async irARegistrarUsuario(): Promise<number> {
        return browser.get(browser.baseUrl + '/register');
    }


    async ingresarNombreUsuario(nombreUsuario){
        await this.inputNombreDeUsuario.sendKeys(nombreUsuario);
    }
    async ingresarCorreoUsuario(correo){
        await this.inputCorreoDeUsuario.sendKeys(correo);
    }
    async ingresarPasswordUsuario(password){
        await this.inputPasswordDeUsuario.sendKeys(password);
    }

    async clickBotonIniciarSesion(){
        await this.botonIniciarSesion.click();
    }
    async clickBotonRegistrar(){
        await this.botonRegistrar.click();
    }

    async clickCerrarSesion(){
        await this.botonCerrarSesion.click();
    }
}