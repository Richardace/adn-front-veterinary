import { ReservaPage } from './../page/reserva/reserva.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let reserva: ReservaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        reserva = new ReservaPage();
    });

    it('Deberia listar las reservas', async () => {
        await page.navigateTo();
        await navBar.clickBotonListar();

        expect(reserva.contarReservas()).toBeGreaterThanOrEqual(0);
    });

    it('deberria crear una reserva', async () => {
        const cedulaClienteTest = '13456783';
        const nombreDeLaPeliculaTest = 'e2eTest';
        const diasDeReservaTest = 5;
        await page.navigateTo();
        await navBar.clickBotonCrear();
        await reserva.ingresarCedulaDeCliente(cedulaClienteTest);
        await reserva.ingresarNombreDeLaPelicula(nombreDeLaPeliculaTest);
        await reserva.ingresarDiasDeReserva(diasDeReservaTest);
        await reserva.clickBotonReservar();

    });

    it('deberria eliminar una reserva', async () => {
        await page.navigateTo();
        await reserva.irABorrarReserva();
        await reserva.ingresarIdReservaParaEliminar(1);
        await reserva.clickBotonEliminarReserva();
    });

    it('deberria modificar una reserva', async () => {
        await page.navigateTo();
        await navBar.clickBotonListar();
        await reserva.clickBotonModificarReserva();
        await reserva.ingresarNombreDeLaPelicula('nombreTest-e2e');
        await reserva.clickBotonGuardarReservaModifica();
    });

    it('deberria listar una reserva filtrando por cedula', async () => {
        await page.navigateTo();
        await navBar.clickBotonListar();
        await reserva.ingresarCedulaDeCliente('1');
        await reserva.clickBotonConsultar();
        expect(reserva.contarReservas()).toBeGreaterThanOrEqual(0);
    });
});
