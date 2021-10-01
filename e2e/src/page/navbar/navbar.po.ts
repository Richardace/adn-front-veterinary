import { by, element } from 'protractor';

export class NavbarPage {
    linkListarTodo = element(by.xpath('/html/body/app-root/app-navbar/nav/div/a[1]'));
    linkCrear = element(by.xpath('/html/body/app-root/app-navbar/nav/div/a[2]'));

    async clickBotonListar() {
        await this.linkListarTodo.click();
    }
    async clickBotonCrear() {
        await this.linkCrear.click();
    }
}
