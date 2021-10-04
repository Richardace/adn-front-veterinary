// import { CitaPage } from '../page/cita/cita';
import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { CitaPage } from '../page/cita/cita';
import { UsuarioPage } from '../page/usuario/UsuarioPage';

describe('workspace-project Cita', () => {
    let page: AppPage;
    let usuario: UsuarioPage;
    let cita: CitaPage;

    beforeEach(() => {
        page = new AppPage();
        usuario = new UsuarioPage();
        cita = new CitaPage();
    });

    it('deberia iniciar Sesion', async () => {
        browser.driver.manage().window().maximize();
        await page.navigateTo();
        browser.sleep(2000)
        const correo = 'richardacevedo98@gmail.com';
        const password = '1234';
        await usuario.ingresarCorreoUsuario(correo);
        await usuario.ingresarPasswordUsuario(password);
        await usuario.clickBotonIniciarSesion();
        browser.sleep(2000);
        await usuario.clickCerrarSesion();
     });

     it('deberia Registrarse Usuario', async () => {
        browser.driver.manage().window().maximize();
        await page.navigateTo();
        await usuario.irARegistrarUsuario();
        browser.sleep(2000)
        const nombre = "Karen Acevedo"
        const correo = 'elena@gmail.com';
        const password = '1234';
        await usuario.ingresarNombreUsuario(nombre);
        await usuario.ingresarCorreoUsuario(correo);
        await usuario.ingresarPasswordUsuario(password);
        await usuario.clickBotonRegistrar();
        browser.sleep(2000);
        browser.switchTo().alert().accept()
        browser.sleep(2000);
     });

     it('deberia listar Citas', async () => {
        browser.driver.manage().window().maximize();
        await page.navigateTo();
        browser.sleep(2000)
        const correo = 'richardacevedo98@gmail.com';
        const password = '1234';
        await usuario.ingresarCorreoUsuario(correo);
        await usuario.ingresarPasswordUsuario(password);
        await usuario.clickBotonIniciarSesion();
        browser.sleep(2000);
        expect(cita.contarCitas()).toBeGreaterThanOrEqual(0);
        browser.sleep(2000);
        await usuario.clickCerrarSesion();
     });

     it('deberia crear Cita', async () => {
        browser.driver.manage().window().maximize();
        await page.navigateTo();
        browser.sleep(2000)
        const correo = 'elena@gmail.com';
        const password = '1234';
        await usuario.ingresarCorreoUsuario(correo);
        await usuario.ingresarPasswordUsuario(password);
        await usuario.clickBotonIniciarSesion();
        browser.sleep(2000);
        const fecha = '2021-09-30';
        const hora = '2000';
        const notas = 'Prueba Protractor';
        await cita.clickCrearAbreModal();
        browser.sleep(2000);
        await cita.ingresarFecha(fecha);
        await cita.ingresarHora(hora);
        await cita.ingresarNotas(notas);
        browser.sleep(1000);
        browser.executeScript(`
            const button = document.getElementById('crear');
            button.click();
            `);
        browser.sleep(2000);
     });


});
